import { JsonController, Param, Body, Get, Post, Put, UseBefore } from 'routing-controllers';
import UserService from '../../services/user.service';
import { User } from '../../interfaces/User';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';

@JsonController('/user')
export class UserController {

  constructor(private userService: UserService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<{ status: boolean, data: User[]; }> {
    let data = await this.userService.getall();
    return {
      status: true,
      data: data
    };
  }

  @Get('/:id')
  @UseBefore(celebrate(validators.user.get))
  @UseBefore(middlewares.isAuth)
  async getById(@Param('id') id: number): Promise<{ status: boolean, data: User; }> {
    let user = await this.userService.getById(id);
    return {
      status: true,
      data: user
    };
  }

  @Post('/')
  @UseBefore(celebrate(validators.user.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: User): Promise<User> {
    return await this.userService.create(data);
  }

  @Put('/:id')
  @UseBefore(celebrate(validators.user.put))
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number, @Body() params: User): Promise<{ status: boolean, data: User; }> {
    params.id = id;
    let data = await this.userService.update(params);
    return {
      status: true,
      data: data
    };
  }
}
