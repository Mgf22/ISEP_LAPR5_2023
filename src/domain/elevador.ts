import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevadorId } from "./elevadorId";
import { Guard } from "../core/logic/Guard";
import { error } from "console";
import { Piso } from "./piso";
import { Edificio } from "./edificio";

interface ElevadorProps {
  descricao: string;
  numeroSerie: string;
  modelo: string;
  marca: string;
  pisosServidos: Piso[];
  edificio: Edificio;
  numeroIdentificativo: number;
}

export class Elevador extends AggregateRoot<ElevadorProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get elevadorId (): ElevadorId {
    return new ElevadorId(this.elevadorId.toValue());
  }

  get descricao (): string {
    return this.props.descricao;
  }

  get numeroSerie (): string {
    return this.props.numeroSerie;
  }
  
  get modelo (): string {
    return this.props.modelo;
  }

  get marca (): string {
    return this.props.marca;
  }

  get pisosServidos (): Piso[] {
    return this.props.pisosServidos;
  }

  get numeroIdentificativo (): number {
    return this.props.numeroIdentificativo;
  }

  get edificio (): Edificio {
    return this.props.edificio;
  }

  set numeroIdentificativo ( value: number) {
    if(value == null)
      throw error("Número identificativo nulo");
    this.props.numeroIdentificativo = value;
  }

  set numeroSerie ( value: string) {
    if(value.length == 0)
      throw new Error("Numero série vazio");
    this.props.numeroSerie = value;
  }

  set modelo ( value: string) {
    this.props.modelo = value;
  }

  set marca ( value: string) {
    this.props.marca = value;
  }

  set pisosServidos ( value: Piso[]) {
    this.props.pisosServidos = value;
  }

  set descricao ( value: string) {
    this.props.descricao = value;
  }

  set edificio ( value: Edificio) {
    this.props.edificio = value;
  }

  private constructor (props: ElevadorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: ElevadorProps, id?: UniqueEntityID): Result<Elevador> {

    const guardedProps = [
      { argument: props.descricao, argumentName: 'descricao' },
      { argument: props.marca, argumentName: 'marca' },
      { argument: props.modelo, argumentName: 'modelo' },
      { argument: props.numeroIdentificativo, argumentName: 'numeroIdentificativo' },
      { argument: props.numeroSerie, argumentName: 'numeroSerie' },
      { argument: props.pisosServidos, argumentName: 'pisosServidos' },
      { argument: props.edificio, argumentName: 'edificio' }
    ];

    if(props.descricao.length > 250)
      return Result.fail<Elevador>("Descrição excede 250 carateres");

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Elevador>(guardResult.message)
    }     
    else {
      const edificio = new Elevador({
        ...props
      }, id);

      return Result.ok<Elevador>(edificio);
    }
  }

}
