import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { MapaPisoId } from "./mapaPisoId";
import { Piso } from "./piso";


interface MapaPisoProps {
  piso: Piso;
  mapa: JSON;
}

export class MapaPiso extends AggregateRoot<MapaPisoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get mapaPiso (): MapaPisoId {
    return MapaPisoId.caller(this.id)
  }

  get mapa (): JSON {
    return this.props.mapa;
  }

  get piso (): Piso {
    return this.props.piso;
  }

  set piso (value: Piso){
    this.props.piso = value;
  }
  
  set mapa (value : JSON){
    this.props.mapa = value;
  }

  
  private constructor (props: MapaPisoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: MapaPisoProps, id?: UniqueEntityID): Result<MapaPiso> {

    const guardedProps = [
      {argument: props.piso, argumentName: 'piso'},
      { argument: props.mapa, argumentName: 'mapa' },
    ];
    
    // Fazer verificações para as restantes restrições...
    
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<MapaPiso>(guardResult.message)
    }     
    else {
      const mapaPiso = new MapaPiso({
        ...props
      }, id);

      return Result.ok<MapaPiso>(mapaPiso);
    }
  }
}