import { Repo } from "../../core/infra/Repo";
import { Sala } from "../../domain/sala";
import { SalaId } from "../../domain/salaId";

export default interface ISalaRepo extends Repo<Sala> {
  save(role: Sala): Promise<Sala>;
  findByDomainId (roleId: SalaId | string): Promise<Sala>;
  findByDesignacao (designacao: string): Promise<Sala>;
  findAll(): Promise<Sala[]>;
  findByPiso (piso: string): Promise<Sala[]>;
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}