import { UserRepository } from './user.repo';


// Database Interface Extensions:
interface IExtensions {
  user: UserRepository;
}

export {
  IExtensions,
  UserRepository
};
