import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TarefaId } from "./tarefaId";
import { Guard } from "../core/logic/Guard";
import { TipoTarefa } from "./tipoTarefa";

interface TarefaProps {
  tipoTarefa: string;
}

export class Tarefa extends AggregateRoot<TarefaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): TarefaId {
    return TarefaId.caller(this.id)
  }

  get tipoTarefa (): string {
    return this.props.tipoTarefa;
  }

  set tipoTarefa (tipoTarefa: string){
    this.props.tipoTarefa = tipoTarefa;
  }

  private static getTipoTarefaValue(tipoTarefa : string) : number{
    if(tipoTarefa.toLowerCase() == "vigilancia")
      return 0;
    else if(tipoTarefa.toLowerCase() == "transporte")
      return 1;
    else
      return -1;
  }

  private constructor (props: TarefaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static tarefaValue(tarefa : string) : boolean{
    Object.keys(TipoTarefa).forEach(v => {
      if(v.toLowerCase() == tarefa)
        return true;
    });
    return false;
  }

  public static create (props: TarefaProps, id?: UniqueEntityID): Result<Tarefa> {

    const guardedProps = [
      { argument: props.tipoTarefa, argumentName: 'tipoTarefa' },
    ];
    
    if(this.tarefaValue(props.tipoTarefa))
      return Result.fail<Tarefa>("Tarefa inválida!");

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Tarefa>(guardResult.message)
    }     
    else {
      const tarefa = new Tarefa({
        ...props
      }, id);

      return Result.ok<Tarefa>(tarefa);
    }
  }
}
