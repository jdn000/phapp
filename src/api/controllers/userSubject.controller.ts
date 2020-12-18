import { JsonController, Param, Body, Get, Post, Put, UseBefore, Delete } from 'routing-controllers';
import UserSubjectService from '../../services/userSubject.service';
import { UserSubject } from '../../interfaces/User';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';

@JsonController('/usersubject')
export class UserSubjectController {

  constructor(private readonly userSubjectService: UserSubjectService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<UserSubject[]> {
    return this.userSubjectService.getAll();

  }

  @Get('/:id')
  //@UseBefore(celebrate(validators.userSubject.get))
  @UseBefore(middlewares.isAuth)
  async getById(@Param('id') id: number): Promise<UserSubject[]> {
    return this.userSubjectService.getByUserId(id);
  }

  @Post('/')
  //@UseBefore(celebrate(validators.userSubject.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: UserSubject): Promise<UserSubject> {
    return this.userSubjectService.create(data);
  }

  @Delete('/:id')
  // @UseBefore(celebrate(validators.userSubject.put))
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number): Promise<boolean> {

    return this.userSubjectService.delete(id);

  }
}
