import { JsonController, Param, Body, Get, Post, Put, UseBefore } from 'routing-controllers';
import UserService from '../../services/user.service';
import { User } from '../../interfaces/User';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';
import AuthService from '../../services/auth.service';

@JsonController('/user')
export class UserController {

  constructor(private readonly userService: UserService, private readonly authService: AuthService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<User[]> {
    return this.userService.getAll();

  }

  @Get('/:id')
  @UseBefore(celebrate(validators.user.get))
  @UseBefore(middlewares.isAuth)
  async getById(@Param('id') id: number): Promise<User> {
    return this.userService.getById(id);

  }

  @Post('/')
  @UseBefore(celebrate(validators.user.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: User): Promise<string> {
    const { token } = await this.authService.signUp(data);
    return token;

  }

  @Put('/:id')
  @UseBefore(celebrate(validators.user.put))
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number, @Body() params: User): Promise<User> {
    params.id = id;
    return this.userService.update(params);

  }
}
