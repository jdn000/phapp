import { JsonController, Param, Body, Get, Post, Put, UseBefore } from 'routing-controllers';
import CalificationService from '../../services/calification.service';
import { Calification } from '../../interfaces/Calification';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';

@JsonController('/calification')
export class CalificationController {

  constructor(private readonly calificationService: CalificationService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Calification[]> {
    return this.calificationService.getall();

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
  async getByGradeIdAndSubjectId(@Param('alumnId') alumnId: number): Promise<Calification[]> {
    return this.calificationService.getByAlumnId(alumnId);
  }
  @Post('/')
  @UseBefore(celebrate(validators.calification.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: Calification): Promise<Calification> {
    return this.calificationService.create(data);
  }

  @Put('/:id')
  @UseBefore(celebrate(validators.calification.put))
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number, @Body() params: Calification): Promise<Calification> {
    params.id = id;
    return this.calificationService.update(params);

  }
}
