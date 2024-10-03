import { Repo } from "../../core/infra/Repo";
import { Tarefa } from "../../domain/tarefa";
import { TarefaId } from "../../domain/tarefaId";

export default interface ITarefaRepo extends Repo<Tarefa> {
  save(tarefa: Tarefa): Promise<Tarefa>;
  findByDomainId (tarefaId: TarefaId | string): Promise<Tarefa>;
  findByDesignacao (designacaoTarefa : string): Promise<Tarefa>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}