import { Mapper } from "../core/infra/Mapper";

import IRoboDTO from "../dto/IRoboDTO";
import { Robo } from "../domain/robo";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import Container from "typedi";
import TipoRoboRepo from "../repos/tipoRoboRepo";
import { MarcaRobo } from "../domain/marcaRobo";
import { CodigoRobo } from "../domain/codigoRobo";
import { NumeroSerieRobo } from "../domain/numeroSerieRobo";

export class RoboMap extends Mapper<Robo> {
  
  public static toDTO( robo: Robo): IRoboDTO {
    return {
      id: robo.id.toString(),
      estado: robo.estado,
      marca: robo.marca.value,
      codigo: robo.codigo.value,
      numeroSerie: robo.numeroSerie.value,
      nickname: robo.nickname,
      tipoRobo: robo.tipoRobo.designacao
    } as IRoboDTO;
  }

  public static async toDomain (raw: any): Promise<Robo> {

    const tipoRoboRepo = Container.get(TipoRoboRepo);

    const tipoRobo = await tipoRoboRepo.findByDesignacao(raw.tipoRobo);
    
    const roboOrError = Robo.create({
        estado: raw.estado,
        marca: MarcaRobo.create(raw.marca).getValue(),
        codigo: CodigoRobo.create(raw.codigo).getValue(),
        numeroSerie: NumeroSerieRobo.create(raw.numeroSerie).getValue(),
        nickname: raw.nickname,
        tipoRobo: tipoRobo
    }, new UniqueEntityID(raw.domainId));

    roboOrError.isFailure ? console.log(roboOrError.error) : '';

    return roboOrError.isSuccess ? roboOrError.getValue() : null;
  }

  public static toPersistence (robo: Robo): any {
    return {
      domainId: robo.id.toString(),
      estado: robo.estado,
      marca: robo.marca.value,
      codigo: robo.codigo.value,
      numeroSerie: robo.numeroSerie.value,
      nickname: robo.nickname,
      tipoRobo: robo.tipoRobo.designacao
    }
  }
}