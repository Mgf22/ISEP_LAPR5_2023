import { Mapper } from "../core/infra/Mapper";

import ISalaDTO from "../dto/ISalaDTO";
import { Sala } from "../domain/sala";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { CategoriaSala } from "../domain/categoriaSala";
import PisoRepo from "../repos/pisoRepo";
import Container from "typedi";

export class SalaMap extends Mapper<Sala> {
  
  public static toDTO( sala: Sala): ISalaDTO {
    return {
      id: sala.id.toString(),
      descricao: sala.descricao,
      categoria: sala.categoria.toString(),
      designacao: sala.designacao,
      piso: sala.piso.designacao
    } as ISalaDTO;
  }

  public static async toDomain (raw: any): Promise<Sala> {

    const pisoRepo = Container.get(PisoRepo);

    const piso = await pisoRepo.findByDesignacao(raw.piso);

    const salaOrError = Sala.create({
      descricaoSala: raw.descricaoSala,
      categoriaSala: raw.categoriaSala,
      designacaoSala: raw.designacaoSala,
      piso: piso
    }, new UniqueEntityID(raw.domainId));

    salaOrError.isFailure ? console.log(salaOrError.error) : '';

    return salaOrError.isSuccess ? salaOrError.getValue() : null;
  }

  public static toPersistence (sala: Sala): any {

    return {
      domainId: sala.id.toString(),
      descricaoSala: sala.descricao,
      categoriaSala: sala.categoria,
      designacaoSala: sala.designacao,
      piso: sala.piso.designacao
    }
  }
}