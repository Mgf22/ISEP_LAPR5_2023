
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface MarcaRoboProps {
  value: string;
}

export class MarcaRobo extends ValueObject<MarcaRoboProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: MarcaRoboProps) {
    super(props);
  }

  public static create (marca: string): Result<MarcaRobo> {
    const guardResult = Guard.againstNullOrUndefined(marca, 'marca');
    if (!guardResult.succeeded) {
      return Result.fail<MarcaRobo>(guardResult.message);
    } else {
      return Result.ok<MarcaRobo>(new MarcaRobo({ value: marca }))
    }
  }
}