import { JsonController, Get, UseBefore } from 'routing-controllers';
import middlewares from '../middlewares';
import { Subject } from '../../interfaces/Subject';
import SubjectService from '../../services/subject.service';

@JsonController('/subject')
export class SubjectController {

  constructor(private readonly subjectService: SubjectService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Subject[]> {
    return this.subjectService.getAll();
  }


}
