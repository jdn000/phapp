import { JsonController, Get, UseBefore, Put, Param, Body } from 'routing-controllers';
import middlewares from '../middlewares';
import { Grade } from '../../interfaces/Grade';
import GradeService from '../../services/grade.service';

@JsonController('/grade')
export class GradeController {

  constructor(private readonly gradeService: GradeService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Grade[]> {
    return this.gradeService.getAll();
  }

  @Put('/:id')
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number, @Body() params: Grade): Promise<Grade> {
    params.id = id;
    return this.gradeService.update(params);

  }
}
