import { JsonController, Get, UseBefore } from 'routing-controllers';
import middlewares from '../middlewares';
import { Grade } from '../../interfaces/Grade';
import GradeService from '../../services/grade.service';

@JsonController('/grade')
export class GradeController {

  constructor(private readonly gradeService: GradeService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Grade[]> {
    return this.gradeService.getall();
  }


}
