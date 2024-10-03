import { Result } from "../../core/logic/Result";
import IDeleteTarefaDTO from "../../dto/IDeleteTarefaDTO";
import ITarefaDTO from "../../dto/ITarefaDTO";

export default interface ITarefaService {
    createTarefa(tarefaDTO: ITarefaDTO): Promise<Result<ITarefaDTO>>;
    deleteTarefa(tipoTarefa: IDeleteTarefaDTO): Promise<Result<ITarefaDTO>>;
    listTarefas(): Promise<Result<ITarefaDTO[]>>;
}
