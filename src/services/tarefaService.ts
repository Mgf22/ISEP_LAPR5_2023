import { Service, Inject } from 'typedi';
import config from "../../config";
import ITarefaRepo from './IRepos/ITarefaRepo';
import ITarefaService from './IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';
import { Result } from '../core/logic/Result';
import { Tarefa } from '../domain/tarefa';
import { TarefaMap } from '../mappers/TarefaMap';
import IDeleteTarefaDTO from '../dto/IDeleteTarefaDTO';

@Service()
export default class TarefaService implements ITarefaService {
  constructor(
      @Inject(config.repos.tarefa.name) private tarefaRepo : ITarefaRepo
  ) {}

  public async createTarefa(tarefaDTO: ITarefaDTO): Promise<Result<ITarefaDTO>>{
    try {

      const tarefa = await this.tarefaRepo.findByDesignacao(tarefaDTO.tipoTarefa);

      if (tarefa != null)
        return Result.fail<ITarefaDTO>("Já existe uma tarefa com a desginacao " + tarefaDTO.tipoTarefa);

      const tarefaOrError = Tarefa.create({
        tipoTarefa: tarefaDTO.tipoTarefa
      });

      if (tarefaOrError.isFailure) {
        return Result.fail<ITarefaDTO>(tarefaOrError.errorValue());
      }

      const tarefaResult = tarefaOrError.getValue();
      await this.tarefaRepo.save(tarefaResult);

      const tarefaDTOResult = TarefaMap.toDTO(tarefaResult) as ITarefaDTO;
      return Result.ok<ITarefaDTO>(tarefaDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async deleteTarefa(tarefaDTO: IDeleteTarefaDTO): Promise<Result<ITarefaDTO>> {
    try {
      const tarefa = await this.tarefaRepo.findByDesignacao(tarefaDTO.tipoTarefa);

      if (tarefa == null)
        return Result.fail<ITarefaDTO>("Não existe qualquer tarefa com o tipo " + tarefaDTO.tipoTarefa);

      await this.tarefaRepo.delete(tarefa);

      return Result.ok<ITarefaDTO>(TarefaMap.toDTO(tarefa));
    } catch (err) {
      throw err;
    }
  }

  public async listTarefas(): Promise<Result<ITarefaDTO[]>> {
    try {

        const tarefas = await this.tarefaRepo.findAll();

        if (tarefas == null){
          return Result.fail<ITarefaDTO[]>("Não existem registos de edifícios");
        }
        
        let tarefasDTO : ITarefaDTO[] = [];

        for(const tarefa of tarefas){
          const p = TarefaMap.toDTO(tarefa) as ITarefaDTO;
          tarefasDTO.push(p);
        }

        return Result.ok<ITarefaDTO[]>( tarefasDTO )
      } catch (e) {
        throw e;
      }
  }
}
