import { JsonController, Get, UseBefore, Put, Param, Body, Post } from 'routing-controllers';
import middlewares from '../middlewares';
import { Semester } from '../../interfaces/Semester';
import SemesterService from '../../services/semester.service';

@JsonController('/semester')
export class SemesterController {

  constructor(private readonly semesterService: SemesterService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Semester[]> {
    return this.semesterService.getAll();
  }

  @Get('/current')
  @UseBefore(middlewares.isAuth)
  async getCurrentSemester(): Promise<Semester> {
    return this.semesterService.getCurrentSemester();
  }

  @Put('/:id')
  @UseBefore(middlewares.isAuth)
  async update(@Param('id') id: number, @Body() params: Semester): Promise<Semester> {
    params.id = id;
    return this.semesterService.update(params);
  }

  @Post('/sync/:gradeId')
  @UseBefore(middlewares.isAuth)
  async sync(@Param('gradeId') gradeId: number): Promise<any> {
    return this.semesterService.sync(gradeId);
  }
}
