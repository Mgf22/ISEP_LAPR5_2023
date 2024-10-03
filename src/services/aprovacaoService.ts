import { Service, Inject } from 'typedi';
import config from "../../config";
import IAprovacaoDTO from '../dto/IAprovacaoDTO';
import IAprovacaoService from './IServices/IAprovacaoService';
import { Result } from "../core/logic/Result";
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
    ) { }

    private serverUrl = "http://localhost:3500/api/aprovacoes/";

    public async aceitarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>> {
        let err = '';
        try {

            const req = "aceitarRequisicao";

            const queryString = querystring.stringify({ tarefa: JSON.stringify(aprovacaoDTO.tarefa) });
            const data = {
                tarefa: aprovacaoDTO.tarefa
            };

            const dataString = JSON.stringify(data);
            const urlWithQuery = this.serverUrl + req + "?" + queryString;

            let solucao;

            const options: http.RequestOptions = {
                method: 'PATCH',
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

    public async listarRequisicoesNaoAprovadas(): Promise<Result<IAprovacaoDTO[]>> {
        let err = '';
        try {

            const req = "listarTarefasNaoAprovadas";

            const urlWithQuery = this.serverUrl + req

            let solucao;

            const options: http.RequestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            async function makeRequest() {
                return new Promise<string>((resolve, reject) => {
                    const request = http.get(urlWithQuery, options, (response) => {
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

                    request.end();
                });
            }

            await makeRequest();

            if (err.length > 0)
                return Result.fail<IAprovacaoDTO[]>(solucao);

            return Result.ok<IAprovacaoDTO[]>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async recusarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>> {
        let err = '';
        try {

            const req = "recusarRequisicao";

            const queryString = querystring.stringify({ tarefa: JSON.stringify(aprovacaoDTO.tarefa) });
            const data = {
                tarefa: aprovacaoDTO.tarefa
            };

            const dataString = JSON.stringify(data);
            const urlWithQuery = this.serverUrl + req + "?" + queryString;

            let solucao;

            const options: http.RequestOptions = {
                method: 'PATCH',
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


    public async listarPorEstado(estadoDTO: IEstadoDTO): Promise<Result<IAprovacaoDTO[]>> {
        let err = '';
        try {

            const data = {
                estado: estadoDTO.estado
            };

            const req = "pesquisarRequisicaoPorEstado";
            const queryString = new URLSearchParams(data).toString();
            const urlWithQuery = this.serverUrl + req + "?" + queryString;
            
            let solucao;

            const options: http.RequestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
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
                            let arranged : IAprovacaoDTO | string;
                            try {
                                arranged = data.replace("undefined", "");
                                solucao = JSON.parse(arranged) as IAprovacaoDTO;
                            } catch (Eerr) {
                                solucao = arranged;
                            }
                        });
                    });

                    request.on('error', (error) => {
                        reject(error);
                    });
                    //request.write(dataString);
                    request.end();
                });
            }

            await makeRequest();

            if (err.length > 0)
                return Result.fail<IAprovacaoDTO[]>(""+solucao);

            return Result.ok<IAprovacaoDTO[]>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async listarPorTipoDispositivo(tipoDispositivoDTO: ITipoDispositivoDTO): Promise<Result<IAprovacaoDTO[]>> {
        let err = '';
        try {

            const data = {
                tipoDispositivo: tipoDispositivoDTO.tipoDispositivo
            };

            const req = "pesquisarRequisicaoPorTipoDispositivo";
            const queryString = new URLSearchParams(data).toString();
            const urlWithQuery = this.serverUrl + req + "?" + queryString;
            
            let solucao;

            const options: http.RequestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
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
                            let arranged : IAprovacaoDTO | string;
                            try {
                                arranged = data.replace("undefined", "");
                                solucao = JSON.parse(arranged) as IAprovacaoDTO;
                            } catch (Eerr) {
                                solucao = arranged;
                            }
                        });
                    });

                    request.on('error', (error) => {
                        reject(error);
                    });
                    //request.write(dataString);
                    request.end();
                });
            }

            await makeRequest();

            if (err.length > 0)
                return Result.fail<IAprovacaoDTO[]>(""+solucao);

            return Result.ok<IAprovacaoDTO[]>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async listarPorUtente(utenteDTO: IUtenteDTO): Promise<Result<IAprovacaoDTO[]>> {
        let err = '';
        try {

            const data = {
                utente: utenteDTO.utente
            };

            const req = "pesquisarRequisicaoPorUtente";
            const queryString = new URLSearchParams(data).toString();
            const urlWithQuery = this.serverUrl + req + "?" + queryString;
            
            let solucao;

            const options: http.RequestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
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
                            let arranged : IAprovacaoDTO | string;
                            try {
                                arranged = data.replace("undefined", "");
                                solucao = JSON.parse(arranged) as IAprovacaoDTO;
                            } catch (Eerr) {
                                solucao = arranged;
                            }
                        });
                    });

                    request.on('error', (error) => {
                        reject(error);
                    });
                    //request.write(dataString);
                    request.end();
                });
            }

            await makeRequest();

            if (err.length > 0)
                return Result.fail<IAprovacaoDTO[]>(""+solucao);

            return Result.ok<IAprovacaoDTO[]>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async sequenciaTarefasAprovadas(): Promise<Result<ISequenciaDTO>> {
        let err = '';
        try {

            const req = "sequenciaTarefasAprovadas";

            const urlWithQuery = this.serverUrl + req 

            let solucao;

            const options: http.RequestOptions = {
                method: 'PATCH',
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
                                solucao = JSON.parse(arranged) as ISequenciaDTO;
                            } catch (Eerr) {
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

            await makeRequest();

            if (err.length > 0)
                return Result.fail<ISequenciaDTO>(solucao);

            return Result.ok<ISequenciaDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }

}
