
import { Result } from "../../core/logic/Result";
import IAprovacaoDTO from "../../dto/IAprovacaoDTO";
import IRequisitarDTO from "../../dto/IRequisitarDTO";

export default interface ITarefaAprovacaoService {
    requisitarTarefa(requisitarDTO: IRequisitarDTO): Promise<Result<IAprovacaoDTO>>;
}