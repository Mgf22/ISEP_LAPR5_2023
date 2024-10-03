import { Result } from "../../core/logic/Result";
import IDeleteElevador from "../../dto/IDeleteElevador";
import IElevadorDTO from "../../dto/IElevadorDTO";
import IListElevadoresDTO from "../../dto/IListElevadoresDTO";

export default interface IElevadorService {
  createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>>;
  updateElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>>;
  listElevadores(): Promise<Result<IElevadorDTO[]>>;
  getElevador(elevadorId: string): Promise<Result<IElevadorDTO>>;
  deleteElevador(numeroIdentificativo: IDeleteElevador): Promise<Result<IElevadorDTO>>;
  listElevadoresEdificio(codigoEdificio: IListElevadoresDTO): Promise<Result<IElevadorDTO[]>>;
}
