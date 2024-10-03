import { Mapper } from "../core/infra/Mapper";
import { Container } from 'typedi';

import IPassagemDTO from "../dto/IPassagemDTO";
import { Passagem } from "../domain/passagem";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import EdificioRepo from "../repos/edificioRepo";
import PisoRepo from "../repos/pisoRepo";


export class PassagemMap extends Mapper<Passagem> {
  
  public static toDTO( passagem: Passagem): IPassagemDTO {
    return {
      id: passagem.id.toString(),
      designacao: passagem.designacao,
      edificioA: passagem.edificioA.codigo.toString(),
      edificioB: passagem.edificioB.codigo.toString(),
      pisoA: passagem.pisoA.designacao.toString(),
      pisoB: passagem.pisoB.designacao.toString(),
    } as IPassagemDTO;
  }

  public static async toDomain (raw: any): Promise<Passagem> {
    
    const repoEdificio = Container.get(EdificioRepo);
    const repoPiso = Container.get(PisoRepo);

    const edificioA = await repoEdificio.findByCodigo(raw.edificioA);
    const edificioB = await repoEdificio.findByCodigo(raw.edificioB);

    const pisoA = await repoPiso.findByDesignacao(raw.pisoA);
    const pisoB = await repoPiso.findByDesignacao(raw.pisoB);

    const passagemOrError = Passagem.create({
      designacao: raw.designacao,
      edificioA: edificioA,
      edificioB: edificioB,
      pisoA: pisoA,
      pisoB: pisoB
    }, new UniqueEntityID(raw.domainId));

    passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

    return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
  }

  public static toPersistence (passagem: Passagem): any {
    return {
      domainId: passagem.id.toString(),
      designacao: passagem.designacao,
      edificioA: passagem.edificioA.codigo,
      edificioB: passagem.edificioB.codigo,
      pisoA: passagem.pisoA.designacao,
      pisoB: passagem.pisoB.designacao,
    }
  }
}