import { Service, Inject } from 'typedi';
import config from "../../config";
import IAprovacaoDTO from '../dto/IAprovacaoDTO';
import { Aprovacao } from "../domain/aprovacao";
import IAprovacaoRepo from '../services/IRepos/IAprovacaoRepo';
import IAprovacaoService from './IServices/IAprovacaoService';
import { Result } from "../core/logic/Result";
import { AprovacaoMap } from "../mappers/AprovacaoMap";
import ITarefaRepo from './IRepos/ITarefaRepo';
import IAprovarDTO from '../dto/IAprovarDTO';
import IEstadoDTO from '../dto/IEstadoDTO';
import ITipoDispositivoDTO from '../dto/ITipoDispositivoDTO';
import IUtenteDTO from '../dto/IUtenteDTO';
import ISequenciaDTO from '../dto/ISequenciaDTO';
//const http = require('http');
import * as http from 'http';
import * as querystring from 'querystring';
import { url } from 'inspector';

@Service()
export default class AprovacaoService implements IAprovacaoService {
    constructor(
        @Inject(config.repos.aprovacao.name) private aprovacaoRepo: IAprovacaoRepo,
        @Inject(config.repos.tarefa.name) private tarefaRepo: ITarefaRepo
    ) { }

    public async aceitarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>> {
        try {

            const tarefa = await this.tarefaRepo.findByDesignacao(aprovacaoDTO.tarefa);
            if (tarefa == null)
                return Result.fail<IAprovacaoDTO>("Não foi encontrada nenhuma requisição com esta tarefa!");

            const requisicao = await this.aprovacaoRepo.findByTarefaName(aprovacaoDTO.tarefa);
            if (requisicao == null)
                return Result.fail<IAprovacaoDTO>("Aprovação já foi dada previamente!");

            requisicao.aceita();

            await this.aprovacaoRepo.save(requisicao);

            const aprovacaoDTOResult = AprovacaoMap.toDTO(requisicao) as IAprovacaoDTO;
            return Result.ok<IAprovacaoDTO>(aprovacaoDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async listarRequisicoesNaoAprovadas(): Promise<Result<IAprovacaoDTO[]>> {
        try {
            const aprovacoes = await this.aprovacaoRepo.listarRequisicoesNaoAprovadas();
            if (aprovacoes == null)
                return Result.fail<IAprovacaoDTO[]>("Não existem tarefas por aprovar!");


            let aprovacoesDTO: IAprovacaoDTO[] = [];
            for (let i = 0; i < aprovacoes.length; i++) {
                aprovacoesDTO.push(AprovacaoMap.toDTO(aprovacoes[i]));
            }

            return Result.ok<IAprovacaoDTO[]>(aprovacoesDTO);
        } catch (e) {
            throw e;
        }
    }

    public async recusarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>> {
        try {

            const tarefa = await this.tarefaRepo.findByDesignacao(aprovacaoDTO.tarefa);
            if (tarefa == null) {
                return Result.fail<IAprovacaoDTO>("Tarefa não encontrada!");
            }

            const requisicao = await this.aprovacaoRepo.findByTarefaName(aprovacaoDTO.tarefa);
            if (requisicao == null) {
                return Result.fail<IAprovacaoDTO>("Aprovação já foi dada previamente!")
            }

            requisicao.rejeita();

            await this.aprovacaoRepo.save(requisicao);

            const aprovacaoDTOResult = AprovacaoMap.toDTO(requisicao) as IAprovacaoDTO;
            return Result.ok<IAprovacaoDTO>(aprovacaoDTOResult)
        } catch (e) {
            throw e;
        }
    }


    public async listarPorEstado(estadoDTO: IEstadoDTO): Promise<Result<IAprovacaoDTO[]>> {
        try {

            if (!this.validaEstado(estadoDTO.estado))
                return Result.fail<IAprovacaoDTO[]>("Estado inválido!");

            const aprovacoes = await this.aprovacaoRepo.listarPorEstado(estadoDTO.estado);
            if (aprovacoes == null)
                return Result.fail<IAprovacaoDTO[]>("Não existem tarefas com o estado: " + estadoDTO.estado);


            let aprovacoesDTO: IAprovacaoDTO[] = [];
            for (let i = 0; i < aprovacoes.length; i++) {
                aprovacoesDTO.push(AprovacaoMap.toDTO(aprovacoes[i]));
            }

            return Result.ok<IAprovacaoDTO[]>(aprovacoesDTO);
        } catch (e) {
            throw e;
        }
    }

    private validaEstado(estado: string): Boolean {
        return (estado == "pendente" ? true : estado == "não aceite" ? true : estado == "aceite" ? true : estado == "executado" ? true : false);
    }

    public async listarPorTipoDispositivo(tipoDispositivoDTO: ITipoDispositivoDTO): Promise<Result<IAprovacaoDTO[]>> {
        try {

            const aprovacoes = await this.aprovacaoRepo.listarPorTipoDispositivo(tipoDispositivoDTO.tipoDispositivo);
            if (aprovacoes == null)
                return Result.fail<IAprovacaoDTO[]>("Não existem tarefas com o tipo de dispositivo: " + tipoDispositivoDTO.tipoDispositivo);


            let aprovacoesDTO: IAprovacaoDTO[] = [];
            for (let i = 0; i < aprovacoes.length; i++) {
                aprovacoesDTO.push(AprovacaoMap.toDTO(aprovacoes[i]));
            }

            return Result.ok<IAprovacaoDTO[]>(aprovacoesDTO);
        } catch (e) {
            throw e;
        }
    }

    public async listarPorUtente(utenteDTO: IUtenteDTO): Promise<Result<IAprovacaoDTO[]>> {
        try {

            const aprovacoes = await this.aprovacaoRepo.listarPorUtente(utenteDTO.utente);
            if (aprovacoes == null)
                return Result.fail<IAprovacaoDTO[]>("Não existem tarefas com o utente: " + utenteDTO.utente);


            let aprovacoesDTO: IAprovacaoDTO[] = [];
            for (let i = 0; i < aprovacoes.length; i++) {
                aprovacoesDTO.push(AprovacaoMap.toDTO(aprovacoes[i]));
            }

            return Result.ok<IAprovacaoDTO[]>(aprovacoesDTO);
        } catch (e) {
            throw e;
        }
    }

    public async sequenciaTarefasAprovadas(): Promise<Result<ISequenciaDTO>> {
        try {

            const aprovacoesAceitesOrError = await this.aprovacaoRepo.listarPorEstado('aceite');

            if (aprovacoesAceitesOrError == null) {
                return Result.fail<ISequenciaDTO>("Não existem tarefas aceites para gerar o plano!");
            }

            let sequencia: string = "";

            if (aprovacoesAceitesOrError.length == 1) {
                sequencia.concat(aprovacoesAceitesOrError[0].tarefa.designacaoTarefa);
                return Result.ok<ISequenciaDTO>({
                    plano: [aprovacoesAceitesOrError[0].tarefa.designacaoTarefa],
                    tempo: 0,
                    caminhoPorPiso: [],
                    caminhoEntrePisos: []
                } as ISequenciaDTO);
            }

            let tarefas: string[][] = [];

            aprovacoesAceitesOrError.forEach(val => {
                let tarefa: string[] = [];
                tarefa.push(val.tarefa.designacaoTarefa);
                tarefa.push(val.tarefa.pontoInicial);
                tarefa.push(val.tarefa.pontoTermino);

                tarefas.push(tarefa);
            });

            let solucao: string | ISequenciaDTO;


            const serverUrl = "http://localhost:5000/best_task_order";

            const queryString = querystring.stringify({ tarefas: JSON.stringify(tarefas) });
            const urlWithQuery = serverUrl + "?" + queryString;

            const options: http.RequestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            async function makeRequest() {
                return new Promise<string>((resolve, reject) => {
                    const request = http.get(urlWithQuery, options, (response) => {
                        let data = '';

                        response.on('data', (chunk) => {
                            data += chunk;
                        });

                        response.on('end', () => {
                            resolve(data);
                            const arranged = data.replace("undefined", "");
                            try {
                                solucao = JSON.parse(arranged) as ISequenciaDTO;
                            } catch (err) {
                                solucao = arranged;
                            }
                        });
                    });

                    request.on('error', (error) => {
                        reject(error);
                    });

                    request.end();
                });
            }
            
            const res = await makeRequest();

            // Caso de sucesso atualiza o estado das tarefas.
            for (let i = 0; i < aprovacoesAceitesOrError.length; i++) {
                aprovacoesAceitesOrError[i].executa();
                await this.aprovacaoRepo.save(aprovacoesAceitesOrError[i]);
            }

            return Result.ok<ISequenciaDTO>(solucao as ISequenciaDTO);

        } catch (e) {
            let err : Error = e;
            let res : string = err.message;
            let regex = new RegExp("[a-zA-Z0-9 ]*ECONNREFUSED[ a-zA-Z0-9:]*");
            if(regex.test(res))
                return Result.fail<ISequenciaDTO>("O módulo de planeamento está inativo!");
            throw e;
        }
    }

}
