import { Result } from "../../core/logic/Result";
import  ICreatingUserDTO  from "../../dto/ICreatingUserDTO";
import IUpdateUserDTO from "../../dto/IUpdateUserDTO";
import  IUserDTO  from "../../dto/IUserDTO";

export default interface IUserService  {
  criarUser(userDTO: ICreatingUserDTO): Promise<Result<IUserDTO>>;
  criarUtente(userDTO: ICreatingUserDTO): Promise<Result<IUserDTO>>;
  updateUser(userEmail: string, userDTO: IUpdateUserDTO): Promise<Result<IUserDTO>>;
  getAllUsers(): Promise<Result<IUserDTO[]>>;
  getUserByEmail(userEmail: string): Promise<Result<IUserDTO>>;
  deleteUser(userEmail: string): Promise<Result<IUserDTO>>;
  login(userEmail: string, userPassword: string): Promise<Result<IUserDTO>>;
  /*SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
*/
}
