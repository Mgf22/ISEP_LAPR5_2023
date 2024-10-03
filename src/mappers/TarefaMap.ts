import { Mapper } from "../core/infra/Mapper";

import ITarefaDTO from "../dto/ITarefaDTO";
import { Elevador } from "../domain/elevador";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Piso } from "../domain/piso";
import Container from "typedi";
import EdificioRepo from "../repos/edificioRepo";
import PisoRepo from "../repos/pisoRepo";
import { Tarefa } from "../domain/tarefa";
import { TipoTarefa } from "../domain/tipoTarefa";

export class TarefaMap extends Mapper<Tarefa> {
  
  public static toDTO( tarefa: Tarefa): ITarefaDTO {

    return {
      tipoTarefa: tarefa.tipoTarefa
    } as ITarefaDTO;
  }

  public static async toDomain (raw: any): Promise<Tarefa> {

    const tarefaOrError = Tarefa.create({tipoTarefa : raw.tipoTarefa});

    tarefaOrError.isFailure ? console.log(tarefaOrError.error) : '';

    return tarefaOrError.isSuccess ? tarefaOrError.getValue() : null;
  }

  public static toPersistence (tarefa: Tarefa): any {

    return {
      domainId: tarefa.id.toString(),
      tipoTarefa : tarefa.tipoTarefa
    }
  }
}