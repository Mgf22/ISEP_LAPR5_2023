import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { SalaId } from "./salaId";
import { CategoriaSala } from "./categoriaSala";
import { Guard } from "../core/logic/Guard";
import { Piso } from "./piso";

interface SalaProps {
  descricaoSala: string;
  categoriaSala: string;
  designacaoSala: string;
  piso: Piso
}

export class Sala extends AggregateRoot<SalaProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get salaId (): SalaId {
    return new SalaId(this.salaId.toValue());
  }

  get descricao (): string {
    return this.props.descricaoSala;
  }

  get categoria (): string {
    return this.props.categoriaSala;
  }

  get designacao (): string {
    return this.props.designacaoSala;
  }

  get piso (): Piso {
    return this.props.piso;
  }

  set descricao (value: string){
    this.props.descricaoSala = value;
  }

  set categoria (value: string){
    this.props.categoriaSala = value;
  }

  set designacao (value: string){
    if (value == null){
      throw new Error("Designação vazia");
    }
    this.props.designacaoSala = value;
  }

  set piso (value: Piso){
    this.props.piso = value;
  }

  private constructor (props: SalaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static categoriaValue(categoriaSala : string) : boolean{
    Object.keys(CategoriaSala).forEach(v => {
      if(v.toLowerCase() == categoriaSala)
        return true;
    });
    return false;
  }

  public static create (props: SalaProps, id?: UniqueEntityID): Result<Sala> {

    const guardedProps = [
      { argument: props.designacaoSala, argumentName: 'designacaoSala' },
      { argument: props.descricaoSala, argumentName: 'descricaoSala' },
      { argument: props.categoriaSala, argumentName: 'categoriaSala' },
      { argument: props.piso, argumentName: 'piso' }
    ];

    if (props.designacaoSala.length > 50){
      return Result.fail<Sala>("Designacao excede 50 caracteres");
    }

    if(props.descricaoSala.length > 250)
      return Result.fail<Sala>("Descrição excede 250 carateres");

    if(this.categoriaValue(props.categoriaSala))
      return Result.fail<Sala>("Categoria inválida!");

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Sala>(guardResult.message)
    }     
    else {
      const sala = new Sala({
        ...props
      }, id);

      return Result.ok<Sala>(sala);
    }
  }
}
