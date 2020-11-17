import { JsonController, Param, Body, Get, Post, Put, UseBefore } from 'routing-controllers';
import LearningObjectiveService from '../../services/learningObjective.service';
import { LearningObjective } from '../../interfaces/LearningObjective';
import { celebrate } from 'celebrate';
import middlewares from '../middlewares';
import { validators } from '../middlewares/inputValidators';

@JsonController('/learningObjective')
export class LearningObjectiveController {

  constructor(private readonly learningObjectiveService: LearningObjectiveService) { }

  @Get('/')
  @UseBefore(middlewares.isAuth)
  async getAll(): Promise<LearningObjective[]> {
    return this.learningObjectiveService.getall();

  }
  @Get('/:id')
  @UseBefore(celebrate(validators.learningObjective.get))
  @UseBefore(middlewares.isAuth)
  async getById(@Param('id') id: number): Promise<LearningObjective> {
    return this.learningObjectiveService.getById(id);
  }
  @Get('/subject/:subjectId')
  @UseBefore(celebrate(validators.learningObjective.getBySubjectId))
  @UseBefore(middlewares.isAuth)
  async getBySubjectId(@Param('subjectId') subjectId: number): Promise<LearningObjective[]> {
    return this.learningObjectiveService.getBySubjectId(subjectId);
  }
  @Get('/grade/:gradeId/subject/:subjectId')
  @UseBefore(celebrate(validators.learningObjective.getByGradeIdAndSubjectId))
  @UseBefore(middlewares.isAuth)
  async getByGradeIdAndSubjectId(@Param('subjectId') subjectId: number, @Param('gradeId') gradeId: number): Promise<LearningObjective[]> {
    return this.learningObjectiveService.getByGradeIdAndSubjectId(subjectId, gradeId);
  }
  @Post('/')
  @UseBefore(celebrate(validators.learningObjective.post))
  @UseBefore(middlewares.isAuth)
  async post(@Body() data: LearningObjective): Promise<LearningObjective> {
    return this.learningObjectiveService.create(data);
  }

  @Put('/:id')
  @UseBefore(celebrate(validators.learningObjective.put))
  @UseBefore(middlewares.isAuth)
  async put(@Param('id') id: number, @Body() params: LearningObjective): Promise<LearningObjective> {
    params.id = id;
    return this.learningObjectiveService.update(params);

  }
}
