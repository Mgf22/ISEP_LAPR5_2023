import { Repo } from "../../core/infra/Repo";
import { TipoRoboId } from "../../domain/tipoRoboId";
import { TipoRobo } from "../../domain/tipoRobo";

export default interface ITipoRoboRepo extends Repo<TipoRobo> {
  save(edificio: TipoRobo): Promise<TipoRobo>;
  findByDomainId (edificioId: TipoRoboId | string): Promise<TipoRobo>;
  findByDesignacao(value: string): Promise<TipoRobo>;
  delete(tipoRobo: TipoRobo ): Promise<TipoRobo>;
  findAll(): Promise<TipoRobo[]>;
}