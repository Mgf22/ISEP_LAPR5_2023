import { Result } from "../../core/logic/Result";
import IEdificioDTO from "../../dto/IEdificioDTO";
import IListElevadoresDTO from "../../dto/IListElevadoresDTO";
import IElevadorDTO from "../../dto/IElevadorDTO";
import IListPisosDTO from "../../dto/IListPisosDTO";
import IPisoDTO from "../../dto/IPisoDTO";
import IListMinMaxDTO from "../../dto/IListMinMaxDTO";
import IDeleteEdificio from "../../dto/IDeleteEdificio";


export default interface IEdificioService  {
  createEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  updateEdificio(edificioDTO: IEdificioDTO): Promise<Result<IEdificioDTO>>;
  listEdificios(): Promise<Result<IEdificioDTO[]>>;
  getEdificio (edificioId: string): Promise<Result<IEdificioDTO>>;
  deleteEdificio(codigoEdificio: IDeleteEdificio): Promise<Result<IEdificioDTO>>;
  listMinMax(minMax: IListMinMaxDTO): Promise<Result<IEdificioDTO[]>>;
}