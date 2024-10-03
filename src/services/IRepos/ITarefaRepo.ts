import { Repo } from "../../core/infra/Repo";
import { Tarefa } from "../../domain/tarefa";
import { TarefaId } from "../../domain/tarefaId";

export default interface ITarefaRepo extends Repo<Tarefa> {
  save(tarefa: Tarefa): Promise<Tarefa>;
  findByDomainId (tarefaId: TarefaId | string): Promise<Tarefa>;
  findByDesignacao (designacao: string): Promise<Tarefa>;
  delete(tarefa: Tarefa ): Promise<Tarefa>;
  findAll(): Promise<Tarefa[]>;
}