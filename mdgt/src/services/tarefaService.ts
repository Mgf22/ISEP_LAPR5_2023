import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITarefaService from './IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';
import ITarefaRepo from './IRepos/ITarefaRepo';
import { Tarefa } from '../domain/tarefa';
import { TarefaMap } from '../mappers/TarefaMap';
import IRequisitarDTO from '../dto/IRequisitarDTO';
import { Aprovacao } from '../domain/aprovacao';
import IAprovacaoRepo from './IRepos/IAprovacaoRepo';

@Service()
export default class TarefaService implements ITarefaService {
    constructor(
        @Inject(config.repos.tarefa.name) private tarefaRepo: ITarefaRepo,
        @Inject(config.repos.aprovacao.name) private aprovacaoRepo : IAprovacaoRepo
    ) { }

    public async requisitarTarefa(requisitarDTO: IRequisitarDTO): Promise<Result<ITarefaDTO>> {
        try {

            const tarefa = await this.tarefaRepo.findByDesignacao(requisitarDTO.tarefa);

            if(tarefa != null){
                return Result.fail<ITarefaDTO>("Já existe uma tarefa com esta designação!");
            }

            const tarefaOrError = Tarefa.create({
                tipoTarefa: requisitarDTO.tipoTarefa,
                pontoTermino: requisitarDTO.pontoTermino,
                pontoInicial: requisitarDTO.pontoInicio,
                designacaoTarefa: requisitarDTO.tarefa
            });

            if (tarefaOrError.isFailure) {
                return Result.fail<ITarefaDTO>(tarefaOrError.errorValue());
            }

            const tarefaResult = tarefaOrError.getValue();

            const aprovacaoOrError = Aprovacao.create({
                tarefa: tarefaResult,
                requisitante : requisitarDTO.requisitante,
                tipoDispositivo : requisitarDTO.tipoDispositivo,
                estado : 'pendente'
            });

            if(aprovacaoOrError.isFailure){
                return Result.fail<ITarefaDTO>(aprovacaoOrError.errorValue());
            }

            const aprovacaoResult = aprovacaoOrError.getValue();

            await this.tarefaRepo.save(tarefaResult);

            await this.aprovacaoRepo.save(aprovacaoResult);

            const tarefaDTOResult = TarefaMap.toDTO(tarefaResult) as ITarefaDTO;
            return Result.ok<ITarefaDTO>(tarefaDTOResult)
        } catch (e) {
            throw e;
        }
    }


}
