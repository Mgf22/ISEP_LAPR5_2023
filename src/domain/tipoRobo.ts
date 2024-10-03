import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TipoRoboId } from "./tipoRoboId";
import { Guard } from "../core/logic/Guard";
import { Tarefa } from "./tarefa"

interface TipoRoboProps {
  tarefas: Tarefa[];
  designacao: string;
  marca: string;
  modelo: string;
}

export class TipoRobo extends AggregateRoot<TipoRoboProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get tipoRoboId(): TipoRoboId {
    return TipoRoboId.caller(this.id)
  }

  get tarefas(): Tarefa[] {
    return this.props.tarefas;
  }

  get marca(): string {
    return this.props.marca;
  }

  get modelo(): string {
    return this.props.modelo;
  }

  set tarefas(tarefas: Tarefa[]) {
    this.props.tarefas = tarefas;
  }

  set marca(marca: string) {
    this.props.marca = marca;
  }

  set modelo(modelo: string) {
    this.props.modelo = modelo;
  }

  get designacao(): string {
    return this.props.designacao;
  }

  set designacao(designacao: string) {
    this.props.designacao = designacao;
  }

  private constructor(props: TipoRoboProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /*public static create (props: TipoRoboProps, id?: UniqueEntityID): Result<TipoRobo> {

    const guardedProps = [
      { argument: props.tarefas, argumentName: 'tarefas' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TipoRobo>(guardResult.message)
    }     
    else {
      const tipoRobo = new TipoRobo({
        ...props
      }, id);

      return Result.ok<TipoRobo>(tipoRobo);
    }
  }*/

  /*
  public static create (tipoRoboDTO: ITipoRoboDTO, id?: UniqueEntityID): Result<TipoRobo> {

    if(tipoRoboDTO.numeroSerie.length == 0)
      throw Error("Numero série vazio");

    let tarefas : Tarefa[];
    tipoRoboDTO.tarefas.forEach(t => tarefas.push())

    const elevador = new TipoRobo({ 
      designacao: tipoRoboDTO.designacao,
      marca: tipoRoboDTO.marca,
      modelo: tipoRoboDTO.modelo,
      tarefas: tipoRoboDTO.tarefas,
    }, id);
    return Result.ok<TipoRobo>( elevador )
    
  }*/

  public static create(props: TipoRoboProps, id?: UniqueEntityID): Result<TipoRobo> {

    const guardedProps = [
      { argument: props.designacao, argumentName: 'designacao' },
      { argument: props.marca, argumentName: 'marca' },
      { argument: props.modelo, argumentName: 'modelo' },
      { argument: props.tarefas, argumentName: 'tarefas' }
    ];

    if (props.designacao.length > 25)
      return Result.fail<TipoRobo>("Designação excede 25 carateres");

    if (props.marca.length > 50)
      return Result.fail<TipoRobo>("Marca excede 50 carateres");

    if (props.modelo.length > 100)
      return Result.fail<TipoRobo>("Modelo excede 100 carateres");

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TipoRobo>(guardResult.message)
    }
    else {
      const tipoRobo = new TipoRobo({
        ...props
      }, id);

      return Result.ok<TipoRobo>(tipoRobo);
    }
  }

}
