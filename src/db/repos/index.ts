import { AlumnRepository } from './alumn.repo';
import { CalificationRepository } from './calification.repo';
import { GradeRepository } from './grade.repo';
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
}

export {
  IExtensions,
  UserRepository,
  AlumnRepository,
  GradeRepository,
  SubjectRepository,
  LearningObjectiveRepository, CalificationRepository
};
