import { Result } from "../../core/logic/Result";
import IPisoDTO from "../../dto/IPisoDTO";
import ISalaDTO from "../../dto/ISalaDTO";

export default interface ISalaService  {
  createSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>>;
  updateSala(salaDTO: ISalaDTO): Promise<Result<ISalaDTO>>;
  listSalas(): Promise<Result<ISalaDTO[]>>;
  listSalasPisos(designacao : string): Promise<Result<ISalaDTO[]>>;
  getSala (salaId: string): Promise<Result<ISalaDTO>>;
}
