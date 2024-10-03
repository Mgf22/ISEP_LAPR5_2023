import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { PassagemId } from "./passagemId";
import { Guard } from "../core/logic/Guard";
import { Edificio } from "./edificio";
import { Piso } from "./piso";

interface PassagemProps {
  designacao: string;
  edificioA: Edificio;
  edificioB: Edificio;
  pisoA: Piso;
  pisoB: Piso;
}

export class Passagem extends AggregateRoot<PassagemProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get passagemId (): PassagemId {
    return PassagemId.caller(this.id)
  }

  get edificioA (): Edificio {
    return this.props.edificioA;
  }

  get edificioB (): Edificio {
    return this.props.edificioB
  }

  get pisoA (): Piso {
    return this.props.pisoA;
  }

  get pisoB (): Piso {
    return this.props.pisoB;
  }

  get designacao (): string {
    return this.props.designacao;
  }

  set designacao (value : string){
    if (value == null){
      throw new Error("Designação vazia");
    }
    this.props.designacao = value;
  }

  set edificioA (value : Edificio) {
    this.props.edificioA = value;
  }
  
  set edificioB (value : Edificio) {
    this.props.edificioB = value;
  }

  set pisoA (value : Piso) {
    this.props.pisoA = value;
  }

  set pisoB (value : Piso) {
    this.props.pisoB = value;
  }

  private constructor (props: PassagemProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PassagemProps, id?: UniqueEntityID): Result<Passagem> {

    const guardedProps = [
      { argument: props.designacao, argumentName: 'designacao' },
      { argument: props.edificioA, argumentName: 'edificioA' },
      { argument: props.edificioB, argumentName: 'edificioB' },
      { argument: props.pisoA, argumentName: 'pisoA' },
      { argument: props.pisoB, argumentName: 'pisoB' }
    ];

    if (props.designacao.length > 50)
      return Result.fail<Passagem>("Designação do piso excede 50 caracteres");

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Passagem>(guardResult.message)
    }     
    else {
      const passagem = new Passagem({
        ...props
      }, id);

      return Result.ok<Passagem>(passagem);
    }
  }
  /*
  // Verificar forma de 
  public static create (passagemDTO: IPassagemDTO, id?: UniqueEntityID): Result<Passagem> {

    try{
      const edificioOrigem = EdificioMap.toDomain(passagemDTO.edificioOrigem) as Result<Edificio>;
      const edificioDestino = await EdificioMap.toDomain(passagemDTO.edificioDestino) as Result<Edificio>;
      const pisoOrigem = PisoMap.toDomain(passagemDTO.pisoOrigem);
      const pisoDestino = PisoMap.toDomain(passagemDTO.pisoDestino);
      
      const passagem = new Passagem({ 
        edificioA: edificioOrigem,
        edificioB: edificioDestino,
        pisoA: pisoOrigem,
        pisoB: pisoDestino
      }, id);
        return Result.ok<Passagem>( passagem)
  }catch(e){
    return Result.fail(e);
  }
    
  }*/
}