import { AlumnRepository } from './alumn.repo';
import { CalificationRepository } from './calification.repo';
import { CummulativeRepository } from './cummulative.repo';
import { GradeRepository } from './grade.repo';
import { IndicatorRepository } from './indicator.repo';
import { LearningObjectiveRepository } from './learnigObjective.repo';
import { SubjectRepository } from './subject.repo';
import { UserRepository } from './user.repo';


// Database Interface Extensions:
interface IExtensions {
  user: UserRepository;
  alumn: AlumnRepository;
  grade: GradeRepository;
  subject: SubjectRepository;
  learningObjective: LearningObjectiveRepository;
  calification: CalificationRepository;
  indicator: IndicatorRepository;
  cummulative: CummulativeRepository;
}

export {
  IExtensions,
  UserRepository,
  AlumnRepository,
  GradeRepository,
  SubjectRepository,
  LearningObjectiveRepository,
  CalificationRepository,
  IndicatorRepository,
  CummulativeRepository
};
