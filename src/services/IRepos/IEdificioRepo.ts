import { Repo } from "../../core/infra/Repo";
import { Edificio } from '../../domain/edificio';
import { EdificioId } from "../../domain/edificioId";

export default interface IEdificioRepo extends Repo<Edificio> {
  save(edificio: Edificio): Promise<Edificio>;
  findByDomainId (edificioId: EdificioId | string): Promise<Edificio>;
  findByCodigo(codigo: string): Promise<Edificio>;
  findAll(): Promise<Edificio[]>;
  delete(edificio: Edificio): Promise<Edificio>;

    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}