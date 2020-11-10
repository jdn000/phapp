import { AlumnRepository } from './alumn.repo';
import { UserRepository } from './user.repo';


// Database Interface Extensions:
interface IExtensions {
  user: UserRepository;
  alumn: AlumnRepository;
}

export {
  IExtensions,
  UserRepository,
  AlumnRepository
};
