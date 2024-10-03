import { Repo } from "../../core/infra/Repo";
import { Piso } from "../../domain/piso";
import { PisoId } from "../../domain/pisoId";

export default interface IPisoRepo extends Repo<Piso> {
  save(piso: Piso): Promise<Piso>;
  findByDomainId (pisoId: PisoId | string): Promise<Piso>;
  findByDesignacao(designacao: string): Promise<Piso>
  findByEdificio(codigoEdificio: string): Promise<Piso[]>
  delete(piso: Piso ): Promise<Piso>;
  findAll(): Promise<Piso[]>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}