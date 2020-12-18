import { JsonController, Param, Body, Get, Post, Put, UseBefore } from 'routing-controllers';
import CalificationService from '../../services/calification.service';
import { AlumnCalification, BatchCalifications, Calification } from '../../interfaces/Calification';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';
import { CalificationCummulative } from '../../interfaces/CummulativeCalification';

@JsonController('/calification')
export class CalificationController {

  constructor(
    private readonly calificationService: CalificationService,

  ) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Calification[]> {
    return this.calificationService.getAll();

  }
  @Get('/:id')
  @UseBefore(celebrate(validators.calification.get))
  @UseBefore(middlewares.isAuth)
  async getById(@Param('id') id: number): Promise<Calification> {
    return this.calificationService.getById(id);
  }

  @Get('/alumn/:alumnId/')
  @UseBefore(celebrate(validators.calification.getByAlumnId))
  @UseBefore(middlewares.isAuth)
  async getByAlumnId(@Param('alumnId') alumnId: number): Promise<Calification[]> {
    return this.calificationService.getByAlumnId(alumnId);
  }

  @Get('/grade/:gradeId/subject/:subjectId')
  @UseBefore(celebrate(validators.calification.getByGradeAndSubject))
  @UseBefore(middlewares.isAuth)
  async getByGradeAndSubjectId(@Param('gradeId') gradeId: number, @Param('subjectId') subjectId: number): Promise<Calification[]> {
    return this.calificationService.getByGradeAndSubject(gradeId, subjectId);
  }


  @Get('/cummulative/grade/:gradeId/subject/:subjectId')
  @UseBefore(celebrate(validators.calification.getByGradeAndSubject))
  @UseBefore(middlewares.isAuth)
  async getCummulativeByGradeAndSubjectId(@Param('gradeId') gradeId: number, @Param('subjectId') subjectId: number): Promise<CalificationCummulative[]> {
    return this.calificationService.getCummulativeByGradeAndSubject(gradeId, subjectId);
  }

  @Get('/cummulative/calification/:calificationId')
  @UseBefore(celebrate(validators.calification.getByCalificationId))
  @UseBefore(middlewares.isAuth)
  async getByCalificationId(@Param('calificationId') calificationId: number): Promise<CalificationCummulative[]> {
    return this.calificationService.getCummulativeByCalificationId(calificationId);
  }

  @Get('/cummulative/calification/:calificationId/alumn/:alumnId')
  @UseBefore(celebrate(validators.calification.getByCalificationIdAlumnId))
  @UseBefore(middlewares.isAuth)
  async getByCalificationIdAlumnId(@Param('calificationId') calificationId: number, @Param('alumnId') alumnId: number): Promise<Calification[]> {
    return this.calificationService.getCummulativeByCalificationIdAlumnId(calificationId, alumnId);
  }

  @Post('/')
  @UseBefore(celebrate(validators.calification.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: BatchCalifications): Promise<BatchCalifications> {
    return this.calificationService.create(data);
  }

  @Post('/new')
  // @UseBefore(celebrate(validators.calification.post))
  @UseBefore(middlewares.isAuth)
  async postCalificationForNewAlumn(@Body() data: AlumnCalification[]): Promise<AlumnCalification[]> {
    return this.calificationService.createCalificationForNewAlumn(data);
  }

  @Post('/cummulative')
  @UseBefore(celebrate(validators.calification.postCummulative))
  @UseBefore(middlewares.isAuth)
  async postCummulative(@Body() data: BatchCalifications): Promise<BatchCalifications> {
    return this.calificationService.createCummulativeCalifications(data);
  }

  @Put('/')
  @UseBefore(celebrate(validators.calification.put))
  @UseBefore(middlewares.isAuth)
  async put(@Body() params: Calification[]): Promise<Calification[]> {
    return this.calificationService.update(params);
  }

  @Put('/cummulative')
  @UseBefore(celebrate(validators.calification.put))
  @UseBefore(middlewares.isAuth)
  async putCummulative(@Body() params: Calification[]): Promise<Calification[]> {
    return this.calificationService.updateCummulatives(params);
  }


}
