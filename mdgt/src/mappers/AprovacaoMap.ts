import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IAprovacaoDTO from "../dto/IAprovacaoDTO";

import { Aprovacao } from "../domain/aprovacao";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import TarefaRepo from "../repos/tarefaRepo";

export class AprovacaoMap extends Mapper<Aprovacao> {

  public static toDTO( aprovacao: Aprovacao): IAprovacaoDTO {
    return {
        estado: aprovacao.estado,
        tipoDispositivo: aprovacao.tipoDispositivo,
        tarefa: aprovacao.tarefa.designacaoTarefa,
        requisitante: aprovacao.requisitante
    } as IAprovacaoDTO;
  }

  public static async toDomain (raw: any): Promise<Aprovacao> {
    
    const repo = Container.get(TarefaRepo);
    const tarefa = await repo.findByDesignacao(raw.tarefa);

    const aprovacaoOrError = Aprovacao.create({
      estado: raw.estado,
      tipoDispositivo: raw.tipoDispositivo,
      tarefa: tarefa,
      requisitante: raw.requisitante
    }, new UniqueEntityID(raw.domainId))

    aprovacaoOrError.isFailure ? console.log(aprovacaoOrError.error) : '';
    
    return aprovacaoOrError.isSuccess ? aprovacaoOrError.getValue() : null;
  }

  public static toPersistence (aprovacao: Aprovacao): any {

    const a = {
      domainId: aprovacao.id.toString(),
      estado: aprovacao.estado,
      tipoDispositivo: aprovacao.tipoDispositivo,
      tarefa: aprovacao.tarefa.designacaoTarefa,
      requisitante: aprovacao.requisitante,
    }
    return a;
  }
}