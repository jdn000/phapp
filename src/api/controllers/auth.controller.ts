import { JsonController, Body, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import AuthService from '../../services/auth.service';
import { IUserInputDTO, IUser } from '../../interfaces/IUser';
import Logger from '../../loaders/logger';

@JsonController('/auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/signup')
  async SignUp(@Body() data: IUser) {
    Logger.debug('Calling Sign-Up endpoint with body: %o', data);
    const { user, token } = await this.authService.signUp(data as IUser);
    return {
      status: true,
      data: {
        user, token
      }
    };
  }

  @Post('/signin')
  async SignIn(@Body() data: IUserInputDTO) {
    Logger.debug('Calling Sign-In endpoint with body: %o', data);
    const { token } = await this.authService.signIn(data as IUserInputDTO);
    return {
      status: true,
      data: {
        username: data.username,
        token: token
      }
    };
  }

  @Post('/logout')
  LogOut(@Body() data: IUserInputDTO, @Res() res: Response) {
    Logger.debug('Calling Sign-Out endpoint with body: %o', data);
    return res.status(200).end();
  }
}
