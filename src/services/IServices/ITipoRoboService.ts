import { Result } from "../../core/logic/Result";
import IDeleteTipoRoboDTO from "../../dto/IDeleteTipoRoboDTO";
import ITipoRoboDTO from "../../dto/ITipoRoboDTO";

export default interface IElevadorService  {
  createTipoRobo(tipoRoboDTO: ITipoRoboDTO): Promise<Result<ITipoRoboDTO>>;
  updateTipoRobo(tipoRoboDTO: ITipoRoboDTO): Promise<Result<ITipoRoboDTO>>;
  getTipoRobo (tipoRoboId: string): Promise<Result<ITipoRoboDTO>>;
  deleteTipoRobo(designacao: IDeleteTipoRoboDTO): Promise<Result<ITipoRoboDTO>>;
  listTipoRobo(): Promise<Result<ITipoRoboDTO[]>>;
}
