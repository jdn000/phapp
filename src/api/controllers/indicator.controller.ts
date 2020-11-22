import { JsonController, Param, Body, Get, Post, Put, UseBefore } from 'routing-controllers';
import IndicatorService from '../../services/indicator.service';
import { Indicator } from '../../interfaces/Indicator';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';

@JsonController('/indicator')
export class IndicatorController {

  constructor(private readonly indicatorService: IndicatorService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<Indicator[]> {
    return this.indicatorService.getAll();

  }

  @Get('/:id')
  @UseBefore(celebrate(validators.indicator.get))
  @UseBefore(middlewares.isAuth)
  async getById(@Param('id') id: number): Promise<Indicator> {
    return this.indicatorService.getById(id);
  }
  @Get('/objective/:objectiveId')
  @UseBefore(celebrate(validators.indicator.getByObjectiveId))
  @UseBefore(middlewares.isAuth)
  async getByRun(@Param('objectiveId') objectiveId: number): Promise<Indicator[]> {
    return this.indicatorService.getByObjectiveId(objectiveId);
  }
  @Post('/')
  @UseBefore(celebrate(validators.indicator.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: Indicator): Promise<Indicator> {
    return this.indicatorService.create(data);
  }

  @Put('/:id')
  @UseBefore(celebrate(validators.indicator.put))
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number, @Body() params: Indicator): Promise<Indicator> {
    params.id = id;
    return this.indicatorService.update(params);

  }
}
