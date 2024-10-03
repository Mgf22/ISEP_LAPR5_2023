import { Repo } from "../../core/infra/Repo";
import { MapaPiso } from "../../domain/mapaPiso";
import { MapaPisoId } from "../../domain/mapaPisoId";

export default interface IMapaPisoRepo extends Repo<MapaPiso> {
  save(mapa: MapaPiso): Promise<MapaPiso>;
  findByDomainId (mapaId: MapaPisoId | string): Promise<MapaPiso>;
  findByPiso (designacao : string) : Promise<MapaPiso>;
  delete(mapaPiso: MapaPiso ): Promise<MapaPiso>;
  findAll(): Promise<MapaPiso[]>;
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}