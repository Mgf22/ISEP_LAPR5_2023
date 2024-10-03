import { Mapper } from "../core/infra/Mapper";

import ITarefaDTO from "../dto/ITarefaDTO";

import { Tarefa } from "../domain/tarefa";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class TarefaMap extends Mapper<Tarefa> {

    public static toDTO(tarefa: Tarefa): ITarefaDTO {
        return {
            designacaoTarefa : tarefa.designacaoTarefa,
            pontoTermino : tarefa.pontoTermino,
            pontoInicial : tarefa.pontoInicial,
            tipoTarefa : tarefa.tipoTarefa
        } as ITarefaDTO;
    }

    public static  toDomain(raw: any): Tarefa {

        const aprovacaoOrError = Tarefa.create({
            designacaoTarefa : raw.designacaoTarefa,
            pontoTermino : raw.pontoTermino,
            pontoInicial : raw.pontoInicial,
            tipoTarefa : raw.tipoTarefa
        }, new UniqueEntityID(raw.domainId))

        aprovacaoOrError.isFailure ? console.log(aprovacaoOrError.error) : '';

        return aprovacaoOrError.isSuccess ? aprovacaoOrError.getValue() : null;
    }

    public static toPersistence(tarefa: Tarefa): any {

        const a = {
            domainId: tarefa.id.toString(),
            designacaoTarefa : tarefa.designacaoTarefa,
            pontoTermino : tarefa.pontoTermino,
            pontoInicial : tarefa.pontoInicial,
            tipoTarefa : tarefa.tipoTarefa
        }
        return a;
    }
}