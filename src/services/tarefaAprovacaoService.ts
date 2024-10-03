import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITarefaService from './IServices/ITarefaService';
import ITarefaDTO from '../dto/ITarefaDTO';
import ITarefaRepo from './IRepos/ITarefaRepo';
import { Tarefa } from '../domain/tarefa';
import { TarefaMap } from '../mappers/TarefaMap';
import IRequisitarDTO from '../dto/IRequisitarDTO';
import ITarefaAprovacaoService from './IServices/ITarefaAprovacaoService';
import * as querystring from 'querystring';
import * as http from 'http';
import IAprovacaoDTO from '../dto/IAprovacaoDTO';

@Service()
export default class TarefaAprovacaoService implements ITarefaAprovacaoService {
    constructor(
    ) { }
    
    private serverUrl = "http://localhost:3500/api/tarefas/";

    public async requisitarTarefa(requisitarDTO: IRequisitarDTO): Promise<Result<IAprovacaoDTO>> {
        let err = '';
        try {

            const req = "requisitar";
        
            const queryString = querystring.stringify({ tarefa: JSON.stringify(requisitarDTO.tarefa) });
            const data = {
                tipoDispositivo: requisitarDTO.tipoDispositivo,
                tarefa: requisitarDTO.tarefa,
                tipoTarefa: requisitarDTO.tipoTarefa,
                pontoInicio: requisitarDTO.pontoInicio,
                pontoTermino: requisitarDTO.pontoTermino,
                requisitante: requisitarDTO.requisitante
            };

            const dataString = JSON.stringify(data);
            const urlWithQuery = this.serverUrl + req + "?" + queryString;

            let solucao;

            const options: http.RequestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            async function makeRequest() {
                return new Promise<string>((resolve, reject) => {
                    const request = http.request(urlWithQuery, options, (response) => {
                        let data: string;

                        if (response.statusCode != 200) {
                            err = response.statusMessage;
                        }

                        response.on('data', (chunk) => {
                            data += chunk;
                        });

                        response.on('end', () => {
                            resolve(data);
                            const arranged = data.replace("undefined", "");
                            try {
                                solucao = JSON.parse(arranged) as IAprovacaoDTO;
                            } catch (Eerr) {
                                solucao = arranged;
                            }
                        });
                    });

                    request.on('error', (error) => {
                        reject(error);
                    });

                    request.write(dataString);
                    request.end();
                });
            }

            await makeRequest();   

            if (err.length > 0)
                return Result.fail<IAprovacaoDTO>(solucao);

            return Result.ok<IAprovacaoDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }


}
