export interface IUser {
  id: number;
  username: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  secondSurName: string;
  email: string;
  roleId: number;
  //  profileImage: string;
}

export interface IUserInputDTO {
  username: string;
  password: string;
}
