import { Repo } from "../../core/infra/Repo";
import { RoboId } from "../../domain/roboId";
import { Robo } from "../../domain/robo";

export default interface IRoboRepo extends Repo<Robo> {
  save(robo: Robo): Promise<Robo>;
  findByDomainId (roboId: RoboId | string): Promise<Robo>;
  findByCodigo(value: string): Promise<Robo>;
  findAll(): Promise<Robo[]>;
  delete(robo: Robo ): Promise<Robo>;
}