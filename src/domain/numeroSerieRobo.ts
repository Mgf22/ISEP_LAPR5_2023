
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface NumeroSerieRoboProps {
  value: string;
}

export class NumeroSerieRobo extends ValueObject<NumeroSerieRoboProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: NumeroSerieRoboProps) {
    super(props);
  }

  public static create (numeroSerie: string): Result<NumeroSerieRobo> {
    const guardResult = Guard.againstNullOrUndefined(numeroSerie, 'numeroSerie');

    if(numeroSerie.length > 50)
      return Result.fail<NumeroSerieRobo>("Número de série excede 50 caracteres");

    if (!guardResult.succeeded) {
      return Result.fail<NumeroSerieRobo>(guardResult.message);
    } else {
      return Result.ok<NumeroSerieRobo>(new NumeroSerieRobo({ value: numeroSerie }))
    }
  }
}