import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAprovacaoService from '../services/IServices/IAprovacaoService';
import ITarefaController from './IControllers/ITarefaController';
import ITarefaService from '../services/IServices/ITarefaService';
import IRequisitarDTO from '../dto/IRequisitarDTO';
var jwt = require('jsonwebtoken');

@Service()
export default class TarefaController implements ITarefaController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.aprovacao.name) private aprovacaoServiceInstance: IAprovacaoService,
        @Inject(config.services.tarefa.name) private tarefaServiceInstance: ITarefaService
        ) { }


    public async requisitar(req: Request, res: Response, next: NextFunction) {
        try{
            const token = req.headers.authorization?.split(' ')[1];
            const decodedToken = jwt.decode(token) as { [key: string]: any };
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            const body = {
                tipoDispositivo: req.body.tipoDispositivo,
                tarefa: req.body.tarefa,
                tipoTarefa: req.body.tipoTarefa,
                pontoInicio: req.body.pontoInicio,
                pontoTermino: req.body.pontoTermino,
                requisitante: email,
            }
            const tarefaOrError = await this.tarefaServiceInstance.requisitarTarefa(body as IRequisitarDTO);
            
            if(tarefaOrError.isFailure){
                return res.status(403).send("Erro: " + tarefaOrError.errorValue());
            }

            const tarefaDTO = tarefaOrError.getValue();
            return res.json(tarefaDTO).status(201);
        }catch (e){
            return next(e);
        }
    };



}