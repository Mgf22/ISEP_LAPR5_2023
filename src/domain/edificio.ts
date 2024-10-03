import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { EdificioId } from "./edificioId";
import { CodigoEdificio } from "./codigoEdificio";
import { Guard } from "../core/logic/Guard";


interface EdificioProps {
  codigoEdificio: CodigoEdificio;
  nomeOpcionalEdificio: string;
  descricaoEdificio: string;
  dimensaoMaximaPiso: number[];
}

export class Edificio extends AggregateRoot<EdificioProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get edificioId (): EdificioId {
    return EdificioId.caller(this.id);
  }

  get codigo (): string {
    return this.props.codigoEdificio.value;
  }

  get nomeOpcional (): string {
    return this.props.nomeOpcionalEdificio;
  }

  get descricao (): string {
    return this.props.descricaoEdificio;
  }

  get dimensaoMaximaPiso (): number[] {
    return this.props.dimensaoMaximaPiso;
  }

  set codigo (value : string) {
    if (value == null){
      throw new Error("Código de Edificio vazio");
    }
    this.props.codigoEdificio = CodigoEdificio.create(value).getValue();
  }

  set nomeOpcional (value : string) {
    this.props.nomeOpcionalEdificio = value;
  }

  set descricao (value : string) {
    this.props.descricaoEdificio = value;
  }

  set dimensaoMaximaPiso (value : number[]) {
    this.props.dimensaoMaximaPiso = value;
  }

  private constructor (props: EdificioProps, id?: UniqueEntityID) {
    super(props, id);
  }

  
  
  public static create (props: EdificioProps, id?: UniqueEntityID): Result<Edificio> {

    const guardedProps = [
      { argument: props.codigoEdificio, argumentName: 'codigoEdificio' },
      { argument: props.descricaoEdificio, argumentName: 'descricao' },
      { argument: props.dimensaoMaximaPiso, argumentName: 'dimensaoMaximaPiso' },
      { argument: props.nomeOpcionalEdificio, argumentName: 'nomeOpcional' },
    ];

    if(props.codigoEdificio.length > 5){
      return Result.fail<Edificio>("Codigo edificio excede 5 caracteres");
    }

    if (props.nomeOpcionalEdificio.length > 50){
      return Result.fail<Edificio>("Nome opcional do edificio excede 50 caracteres");
    }

    if(props.descricaoEdificio.length > 250)
      return Result.fail<Edificio>("Descrição excede 250 carateres");

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Edificio>(guardResult.message)
    }     
    else {
      const edificio = new Edificio({
        ...props
      }, id);

      return Result.ok<Edificio>(edificio);
    }
  }
  
}