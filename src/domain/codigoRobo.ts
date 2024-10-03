
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CodigoRoboProps {
  value: string;
}

export class CodigoRobo extends ValueObject<CodigoRoboProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: CodigoRoboProps) {
    super(props);
  }

  public static create (codigo: string): Result<CodigoRobo> {
    const guardResult = Guard.againstNullOrUndefined(codigo, 'codigo');

    if(codigo.length > 30)
      return Result.fail<CodigoRobo>("Código excedeu 30 caracteres");

    if (!guardResult.succeeded) {
      return Result.fail<CodigoRobo>(guardResult.message);
    } else {
      return Result.ok<CodigoRobo>(new CodigoRobo({ value: codigo }))
    }
  }
}