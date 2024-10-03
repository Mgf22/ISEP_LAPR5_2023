import { Mapper } from "../core/infra/Mapper";

import IEdificioDTO from "../dto/IEdificioDTO";
import { Edificio } from "../domain/edificio";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { CodigoEdificio } from "../domain/codigoEdificio";



export class EdificioMap extends Mapper<Edificio> {
  
  public static toDTO( edificio: Edificio): IEdificioDTO {

    return {
      id: edificio.id.toString(),
      codigoEdificio: edificio.codigo,
      nomeOpcionalEdificio: edificio.nomeOpcional,
      descricaoEdificio: edificio.descricao,
      dimensaoMaximaPiso: edificio.dimensaoMaximaPiso,
    } as IEdificioDTO;
  }

  public static async toDomain (raw: any): Promise<Edificio> {
    
    const codigo = CodigoEdificio.create(raw.codigo).getValue();


    const edificioOrError = Edificio.create({
      codigoEdificio: codigo,
      nomeOpcionalEdificio: raw.nomeOpcional,
      descricaoEdificio: raw.descricao,
      dimensaoMaximaPiso: raw.dimensaoMaximaPiso,
    }, new UniqueEntityID(raw.domainId));

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';

    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  public static toPersistence (edificio: Edificio): any {

    return {
      domainId: edificio.id.toString(),
      codigo: edificio.codigo,
      nomeOpcional: edificio.nomeOpcional,
      descricao: edificio.descricao,
      dimensaoMaximaPiso: edificio.dimensaoMaximaPiso,
    }
  }
}