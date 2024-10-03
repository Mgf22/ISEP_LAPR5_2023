import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAprovacaoService from '../services/IServices/IAprovacaoService';
import ITarefaAprovacaoController from './IControllers/ITarefaAprovacaoController';
import ITarefaAprovacaoService from '../services/IServices/ITarefaAprovacaoService';
import IRequisitarDTO from '../dto/IRequisitarDTO';
var jwt = require('jsonwebtoken');

@Service()
export default class TarefaAprovacaoController implements ITarefaAprovacaoController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.tarefa.name) private tarefaServiceInstance: ITarefaAprovacaoService
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
                requisitante: email
            } as IRequisitarDTO;
            const tarefaOrError = await this.tarefaServiceInstance.requisitarTarefa(body);
        
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