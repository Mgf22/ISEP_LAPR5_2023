import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CaminhoEntrePisosSolucaoProps{
  caminhoEntrePisos: string[][];
  caminhoPorPiso: number[][];
}

export class CaminhoEntrePisosSolucao extends AggregateRoot<CaminhoEntrePisosSolucaoProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

  get caminhoEntrePisos (): string[][] {
    return this.props.caminhoEntrePisos;
  }

  get caminhoPorPiso (): number[][] {
    return this.props.caminhoPorPiso;
  }

  set caminhoEntrePisos (caminhoEntrePisos : string[][]) {
    this.props.caminhoEntrePisos = caminhoEntrePisos;
  }

  set caminhoPorPiso (caminhoPorPiso : number[][]) {
    this.props.caminhoPorPiso = caminhoPorPiso;
  }

  private constructor (props: CaminhoEntrePisosSolucaoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: CaminhoEntrePisosSolucaoProps, id?: UniqueEntityID): Result<CaminhoEntrePisosSolucao> {

    const guardedProps = [
      { argument: props.caminhoEntrePisos, argumentName: 'caminhoEntrePisos' },
      { argument: props.caminhoPorPiso, argumentName: 'caminhoPorPiso' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<CaminhoEntrePisosSolucao>(guardResult.message)
    }     
    else {

      const edificio = new CaminhoEntrePisosSolucao({
        ...props
      }, id);

      /*
      const solDTO : ISolucaoCaminhoDTO = {
        caminhoEntrePisos : props.caminhoEntrePisos,
        caminhoPorPiso : props.caminhoPorPiso
      };

      const edificio = new CaminhoEntrePisosSolucao(solDTO, id);
      */
      return Result.ok<CaminhoEntrePisosSolucao>(edificio);
    }
  }
  
}