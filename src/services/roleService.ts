import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoleDTO from '../dto/IRoleDTO';
import { Role } from "../domain/role";
import IRoleRepo from '../services/IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';
import { Result } from "../core/logic/Result";
import { RoleMap } from "../mappers/RoleMap";
import * as http from 'http';
import * as querystring from 'querystring';
import ICreatingRoleDTO from '../dto/ICreatingRoleDTO';

@Service()
export default class RoleService implements IRoleService {
    constructor(
        @Inject(config.repos.role.name) private roleRepo: IRoleRepo
    ) { }

    private serverUrl = "http://localhost:6969/api/Roles/";


    /*public async getRole(roleId: string): Promise<Result<IRoleDTO>> {
        try {
            const role = await this.roleRepo.findByDomainId(roleId);

            if (role === null) {
                return Result.fail<IRoleDTO>("Role not found");
            }
            else {
                const roleDTOResult = RoleMap.toDTO(role) as IRoleDTO;
                return Result.ok<IRoleDTO>(roleDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }*/


    public async criarRole(roleDTO: ICreatingRoleDTO): Promise<Result<IRoleDTO>> {
        let err = '';
        try {

            const req = "criarRole";

            //const queryString = querystring.stringify({ Name: JSON.stringify(roleDTO.name) });
            const data = {
                name: roleDTO.name
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
                                solucao = JSON.parse(arranged) as IRoleDTO;
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
                return Result.fail<IRoleDTO>(solucao);

            return Result.ok<IRoleDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }

    /*public async updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
      try {
        const role = await this.roleRepo.findByDomainId(roleDTO.id);
  
        if (role === null) {
          return Result.fail<IRoleDTO>("Role not found");
        }
        else {
          role.name = roleDTO.name;
          await this.roleRepo.save(role);
  
          const roleDTOResult = RoleMap.toDTO( role ) as IRoleDTO;
          return Result.ok<IRoleDTO>( roleDTOResult )
          }
      } catch (e) {
        throw e;
      }
    }*/

    public async getAllRoles(): Promise<Result<IRoleDTO[]>> {
        let err = '';
        try {

            const req = "getAllRoles";

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
                                solucao = JSON.parse(arranged) as IRoleDTO;
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
                return Result.fail<IRoleDTO[]>(solucao);

            return Result.ok<IRoleDTO[]>(solucao);

        } catch (e) {
            throw e;
        }
    }

    public async getRoleById(roleId: string): Promise<Result<IRoleDTO>> {
        let err = '';
        try {

            const req = "getRoleById";

            const urlWithQuery = this.serverUrl + req + "/" + roleId;

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
                                solucao = JSON.parse(arranged) as IRoleDTO;
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
                return Result.fail<IRoleDTO>(solucao);

            return Result.ok<IRoleDTO>(solucao);

        } catch (e) {
            throw e;
        }
    }

}
