import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import { db } from '../db';
import { randomBytes } from 'crypto';
import { User, UserInputDTO } from '../interfaces/User';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';
import LoggerInstance from '../loaders/logger';

@Service()
export default class AuthService {
  constructor(
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) { }

  public async signUp(userInputDTO: User): Promise<{ user: User; token: string; }> {
    try {
      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      let userRecord = userInputDTO;
      userRecord['salt'] = salt.toString('hex');
      userRecord.password = hashedPassword;
      let user: User = await db.user.add(userRecord);
      this.logger.silly('Generating JWT');
      const token: string = this.generateToken(user);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.eventDispatcher.dispatch(events.user.signUp, { user: user });
      delete user.password;
      delete user.salt;
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async signIn(user: UserInputDTO): Promise<{ user: User; token: string; }> {
    const userRecord = await db.user.findByUsername(user.username);
    if (!userRecord) {
      throw new Error('User not registered');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, user.password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      const user = userRecord;
      delete user.password;
      delete user.salt;
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user.id}`);
    return jwt.sign(
      {
        id: user.id, // We are gonna use this in the middleware 'isAuth'
        role: user.roleId,
        user: user.username,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
