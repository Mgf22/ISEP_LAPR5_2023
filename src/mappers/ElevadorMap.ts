import { Mapper } from "../core/infra/Mapper";

import IElevadorDTO from "../dto/IElevadorDTO";
import { Elevador } from "../domain/elevador";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Piso } from "../domain/piso";
import Container from "typedi";
import EdificioRepo from "../repos/edificioRepo";
import PisoRepo from "../repos/pisoRepo";

export class ElevadorMap extends Mapper<Elevador> {
  
  public static toDTO( elevador: Elevador): IElevadorDTO {

    let pisos: string[] = [];

    // Vai adicionar as designações dos pisos pisos[].
    elevador.pisosServidos.forEach(piso => pisos.push(piso.designacao));

    return {
      id: elevador.id.toString(),
      descricao: elevador.descricao,
      numeroSerie: elevador.numeroSerie,
      modelo: elevador.modelo,
      marca: elevador.marca,
      pisosServidos: pisos,
      numeroIdentificativo: elevador.numeroIdentificativo,
      edificio: elevador.edificio.codigo,
    } as IElevadorDTO;
  }

  public static async toDomain (raw: any): Promise<Elevador> {

    const edificioRepo = Container.get(EdificioRepo);
    const pisoRepo = Container.get(PisoRepo);

    let pisoArray : Piso[] = [];
    for(const piso of raw.pisosServidos){
      const p = await pisoRepo.findByDesignacao(piso);
      pisoArray.push(p);
    }
    // raw.pisosServidos.forEach(async v => pisoArray.push( await pisoRepo.findByDesignacao(v)));

    const edificio = await edificioRepo.findByCodigo(raw.edificio);
    
    const elevadorOrError = Elevador.create({
      descricao: raw.descricao,
      numeroIdentificativo: raw.numeroIdentificativo,
      numeroSerie: raw.numeroSerie,
      modelo: raw.modelo,
      marca: raw.marca,
      pisosServidos: pisoArray,
      edificio: edificio,
    }, new UniqueEntityID(raw.domainId));

    elevadorOrError.isFailure ? console.log(elevadorOrError.error) : '';

    return elevadorOrError.isSuccess ? elevadorOrError.getValue() : null;
  }

  public static toPersistence (elevador: Elevador): any {

    let pisos : string[] = [];

    elevador.pisosServidos.forEach(p => pisos.push(p.designacao));

    return {
      domainId: elevador.id.toString(),
      descricao: elevador.descricao,
      numeroSerie: elevador.numeroSerie,
      modelo: elevador.modelo,
      marca: elevador.marca,
      pisosServidos: pisos,
      numeroIdentificativo: elevador.numeroIdentificativo,
      edificio: elevador.edificio.codigo
    }
  }
}