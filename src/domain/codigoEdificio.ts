
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CodigoEdificioProps {
  value: string;
}

export class CodigoEdificio extends ValueObject<CodigoEdificioProps> {
  get value (): string {
    return this.props.value;
  }

  get length (): number {
    return this.props.value.length;
  }
  
  private constructor (props: CodigoEdificioProps) {
    super(props);
  }

  public static create (codigoEdificio: string): Result<CodigoEdificio> {
    const guardResult = Guard.againstNullOrUndefined(codigoEdificio, 'codigoEdificio');
    if (!guardResult.succeeded) {
      return Result.fail<CodigoEdificio>(guardResult.message);
    } else {
      return Result.ok<CodigoEdificio>(new CodigoEdificio({ value: codigoEdificio }))
    }
  }
}