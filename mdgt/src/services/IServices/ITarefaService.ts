
import { Result } from "../../core/logic/Result";
import IRequisitarDTO from "../../dto/IRequisitarDTO";
import ITarefaDTO from "../../dto/ITarefaDTO";

export default interface ITarefaService {
    requisitarTarefa(requisitarDTO: IRequisitarDTO): Promise<Result<ITarefaDTO>>;
}