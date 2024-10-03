import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TarefaId } from "./tarefaId";

import ITarefaDTO from "../dto/ITarefaDTO";

interface TarefaProps {
  designacaoTarefa: string;
  pontoTermino: string;
  pontoInicial: string;
  tipoTarefa: string;
}

export class Tarefa extends AggregateRoot<TarefaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get tarefaId (): TarefaId {
    return new TarefaId(this.tarefaId.toValue());
  }

  get designacaoTarefa (): string {
    return this.props.designacaoTarefa;
  }

  get pontoTermino (): string {
    return this.props.pontoTermino;
  }

  get pontoInicial (): string {
    return this.props.pontoInicial;
  }

  get tipoTarefa (): string {
    return this.props.tipoTarefa;
  }

  set designacaoTarefa (value: string) {
    this.props.designacaoTarefa = value;
  }

  set pontoTermino (value: string) {
    this.props.pontoTermino = value;
  }

  set pontoInicial (value: string) {
    this.props.pontoInicial = value;
  }

  set tipoTarefa (value: string) {
    this.props.tipoTarefa = value;
  }

  private constructor (props: TarefaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (tarefaDTO: ITarefaDTO, id?: UniqueEntityID): Result<Tarefa> {
    const designacaoTarefa = tarefaDTO.designacaoTarefa;
    const pontoTermino = tarefaDTO.pontoTermino;
    const pontoInicial = tarefaDTO.pontoInicial;
    const tipoTarefa = tarefaDTO.tipoTarefa;
 
    const tarefa = new Tarefa({ 
        designacaoTarefa : designacaoTarefa,
        pontoInicial : pontoInicial,
        pontoTermino : pontoTermino,
        tipoTarefa : tipoTarefa }, id);

    return Result.ok<Tarefa>( tarefa )
    
  }
}
