import { Repo } from "../../core/infra/Repo";
import { Elevador } from "../../domain/elevador";
import { ElevadorId } from "../../domain/elevadorId";

export default interface IElevadorRepo extends Repo<Elevador> {
  save(role: Elevador): Promise<Elevador>;
  findByDomainId (roleId: ElevadorId | string): Promise<Elevador>;
  findByNumeroIdentificativo(codigo: number): Promise<Elevador>;
  findByEdificio(codigoEdificio: string): Promise<Elevador>;
  delete(elevador: Elevador): Promise<Elevador>;
  findAll(): Promise<Elevador[]>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}