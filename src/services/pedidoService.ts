import { Service, Inject } from 'typedi';
import config from "../../config";
import IPedidoDTO from '../dto/IPedidoDTO';
import IPedidoService from './IServices/IPedidoService';
import { Result } from "../core/logic/Result";
import * as http from 'http';
import * as querystring from 'querystring';
import ICreatingPedidoDTO from '../dto/ICreatingPedidoDTO';

@Service()
export default class PedidoService implements IPedidoService {

    private serverUrl = "http://localhost:6969/api/Pedidos/";

    public async criarPedido(pedidoDTO: ICreatingPedidoDTO): Promise<Result<IPedidoDTO>> {
        let err = '';
        try {

            const req = "criarPedido";

            //const queryString = querystring.stringify({ Name: JSON.stringify(pedidoDTO.name) });
            const data = {
                name: pedidoDTO.name,
                email: pedidoDTO.email,
                phoneNumber: pedidoDTO.phoneNumber,
                nif: pedidoDTO.nif,
                password: pedidoDTO.password
            };

            const dataString = JSON.stringify(data);
            const urlWithQuery = this.serverUrl + req;

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

                        if (response.statusCode != 201) {
                            err = response.statusMessage;
                        }

                        response.on('data', (chunk) => {
                            data += chunk;
                        });

                        response.on('end', () => {
                            resolve(data);
                            const arranged = data.replace("undefined", "");
                            try {
                                solucao = JSON.parse(arranged) as IPedidoDTO;
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
                return Result.fail<IPedidoDTO>(solucao);

            return Result.ok<IPedidoDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async getAllPedidos(): Promise<Result<IPedidoDTO[]>> {
        let err = '';
        try {

            const req = "getAllPedidos";

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
                                solucao = JSON.parse(arranged) as IPedidoDTO;
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
                return Result.fail<IPedidoDTO[]>(solucao);

            return Result.ok<IPedidoDTO[]>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async getAllPedidosPendentes(): Promise<Result<IPedidoDTO[]>> {
        let err = '';
        try {

            const req = "getAllPedidosPendentes";

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
                                solucao = JSON.parse(arranged) as IPedidoDTO;
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
                return Result.fail<IPedidoDTO[]>(solucao);

            return Result.ok<IPedidoDTO[]>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async getPedidoById(pedidoId: string): Promise<Result<IPedidoDTO>> {
        let err = '';
        try {

            const req = "getPedidoById";

            const urlWithQuery = this.serverUrl + req + "/" + pedidoId;

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
                                solucao = JSON.parse(arranged) as IPedidoDTO;
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
                return Result.fail<IPedidoDTO>(solucao);

            return Result.ok<IPedidoDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async aprovarPedido(pedidoId: string): Promise<Result<IPedidoDTO>> {
        let err = '';
        try {

            const req = "aprovarPedido";

            const urlWithQuery = this.serverUrl + req + "/" + pedidoId;

            let solucao;

            const options: http.RequestOptions = {
                method: 'PATCH',
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
                                solucao = JSON.parse(arranged) as IPedidoDTO;
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
                return Result.fail<IPedidoDTO>(solucao);

            return Result.ok<IPedidoDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async recusarPedido(pedidoId: string): Promise<Result<IPedidoDTO>> {
        let err = '';
        try {

            const req = "recusarPedido";

            const urlWithQuery = this.serverUrl + req + "/" + pedidoId;

            let solucao;

            const options: http.RequestOptions = {
                method: 'PATCH',
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
                                solucao = JSON.parse(arranged) as IPedidoDTO;
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
                return Result.fail<IPedidoDTO>(solucao);

            return Result.ok<IPedidoDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }

}