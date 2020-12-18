import { JsonController, Body, Post, Res, Param, Put, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import AuthService from '../../services/auth.service';
import { UserInputDTO, User } from '../../interfaces/User';
import Logger from '../../loaders/logger';
import { validators } from '../middlewares/inputValidators';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
@JsonController('/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  async SignUp(@Body() data: User) {
    Logger.debug('Calling Sign-Up endpoint with body: %o', data);
    const { user, token } = await this.authService.signUp(data);
    return {
      status: true,
      data: {
        user, token
      }
    };
  }

  @Post('/signin')
  async SignIn(@Body() data: UserInputDTO) {
    console.log(data);
    Logger.debug('Calling Sign-In endpoint with body: %o', data);
    const { token } = await this.authService.signIn(data);
    return {
      status: true,
      data: {
        username: data.username,
        token: token
      }
    };
  }

  @Post('/sign-out')
  LogOut(@Body() data: UserInputDTO, @Res() res: Response) {
    Logger.debug('Calling Sign-Out endpoint with body: %o', data);
    return res.status(200).end();
  }

  @Put('/reset-password/:id')
  @UseBefore(celebrate(validators.user.updatePassword))
  @UseBefore(middlewares.isAuth)
  async ResetPassword(@Param('id') id: number, @Body() params: User) {
    params.id = id;
    const user = await this.authService.resetPassword(params);
    return {
      status: true,
      data: {
        user
      }
    };
  }
}
