import { Result } from "../../core/logic/Result";
import IPisoDTO from "../../dto/IPisoDTO";
import IListPisosDTO from "../../dto/IListPisosDTO"
import IListMinMaxDTO from "../../dto/IListMinMaxDTO";
import IEdificioDTO from "../../dto/IEdificioDTO";
import IDeletePisoDTO from "../../dto/IDeletePisoDTO"
import IListPisoByEdificioDTO from "../../dto/IListPisoByEdificioDTO"

export default interface IPisoService  {
  createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
  updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
  getPiso( pisoId: string): Promise<Result<IPisoDTO>>;
  listPisoPassagem(edificioDTO: IPisoDTO): Promise<Result<Array<IPisoDTO>>>;
  listPisos(codigoEdificio: IListPisosDTO): Promise<Result<IPisoDTO[]>>;
  deletePiso(designacao: IDeletePisoDTO): Promise<Result<IPisoDTO>>;
  listPisosGeral(): Promise<Result<IListPisoByEdificioDTO[]>>;
  listPisosGeral2(): Promise<Result<IPisoDTO[]>>;
}