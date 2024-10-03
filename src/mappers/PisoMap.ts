import { Mapper } from "../core/infra/Mapper";
import IPisoDTO from "../dto/IPisoDTO";
import { Piso } from "../domain/piso";
import { Container } from 'typedi';
import EdificioRepo from "../repos/edificioRepo";


export class PisoMap extends Mapper<Piso> {
  
  public static toDTO(piso: Piso): IPisoDTO {

    return {
      id: piso.id.toString(),
      designacao: piso.designacao,
      descricao: piso.descricao,
      edificio: piso.edificio.codigo,
    } as IPisoDTO;
  }


  public static async toDomain (raw: any): Promise<Piso> {

    const edificioRepo = Container.get(EdificioRepo);

    const edificio = await edificioRepo.findByCodigo(raw.edificio);

    const pisoOrError = Piso.create({
      descricao: raw.descricao,
      designacao: raw.designacao,
      edificio: edificio
    });

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static toPersistence (piso: Piso): any {

    return {
      domainId: piso.id,
      descricao: piso.descricao,
      designacao: piso.designacao,
      edificio: piso.edificio.codigo,
    }
  }
}