import { Result } from "../../core/logic/Result";
import ICreatingRoleDTO from "../../dto/ICreatingRoleDTO";
import IRoleDTO from "../../dto/IRoleDTO";

export default interface IRoleService  {
  criarRole(roleDTO: ICreatingRoleDTO): Promise<Result<IRoleDTO>>;
  //updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>>;
  getAllRoles(): Promise<Result<IRoleDTO[]>>;
  getRoleById(roleId: string): Promise<Result<IRoleDTO>>;
}
