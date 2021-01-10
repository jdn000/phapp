import { JsonController, Param, Body, Get, Post, Put, UseBefore } from 'routing-controllers';
import AlumnService from '../../services/alumn.service';
import { Alumn } from '../../interfaces/Alumn';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';
import { CalificationReport } from '../../interfaces/Calification';

@JsonController('/alumn')
export class AlumnController {

  constructor(private readonly alumnService: AlumnService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Alumn[]> {
    return this.alumnService.getAll();

  }

  @Get('/:id')
  @UseBefore(celebrate(validators.alumn.get))
  @UseBefore(middlewares.isAuth)
  async getById(@Param('id') id: number): Promise<Alumn> {
    return this.alumnService.getById(id);
  }

  @Get('/grade/:gradeNumber')
  @UseBefore(celebrate(validators.alumn.getReportInfo))
  @UseBefore(middlewares.isAuth)
  async getAllData(@Param('gradeNumber') gradeNumber: number): Promise<CalificationReport[]> {
    return this.alumnService.getallData(gradeNumber);
  }

  @Get('/run/:run')
  @UseBefore(celebrate(validators.alumn.getByRun))
  @UseBefore(middlewares.isAuth)
  async getByRun(@Param('run') run: string): Promise<Alumn> {
    return this.alumnService.getByRun(run);
  }
  @Post('/')
  @UseBefore(celebrate(validators.alumn.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: Alumn): Promise<Alumn> {
    return this.alumnService.create(data);
  }

  @Put('/:id')
  @UseBefore(celebrate(validators.alumn.put))
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number, @Body() params: Alumn): Promise<Alumn> {
    params.id = id;
    return this.alumnService.update(params);
  }

  @Get('/:id/report')
  @UseBefore(celebrate(validators.alumn.get))
  @UseBefore(middlewares.isAuth)
  async getReportDataByAlumnId(@Param('id') id: number): Promise<CalificationReport> {
    return this.alumnService.getAlumnData(id);
  }
}
