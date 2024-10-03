import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IAprovacaoController from "./IControllers/IAprovacaoController";
import IAprovacaoService from '../services/IServices/IAprovacaoService';
import IAprovacaoDTO from '../dto/IAprovacaoDTO';

import { Result } from "../core/logic/Result";
import IAprovarDTO from '../dto/IAprovarDTO';
import ITipoDispositivoDTO from '../dto/ITipoDispositivoDTO';
import IUtenteDTO from '../dto/IUtenteDTO';
import IEstadoDTO from '../dto/IEstadoDTO';
import ISequenciaDTO from '../dto/ISequenciaDTO';

@Service()
export default class AprovacaoController implements IAprovacaoController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.aprovacao.name) private aprovacaoServiceInstance: IAprovacaoService
    ) { }


    public async aceitarRequisicao(req: Request, res: Response, next: NextFunction) {
        try {
            const aprovacaoOrError = await this.aprovacaoServiceInstance.aceitarRequisicao(req.body as IAprovarDTO) as Result<IAprovacaoDTO>;

            if (aprovacaoOrError.isFailure) {
                return res.status(403).send("Erro: " + aprovacaoOrError.errorValue());
            }

            const aprovacaoDTO = aprovacaoOrError.getValue();
            return res.json(aprovacaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async recusarRequisicao(req: Request, res: Response, next: NextFunction) {
        try {
            const aprovacaoOrError = await this.aprovacaoServiceInstance.recusarRequisicao(req.body as IAprovacaoDTO) as Result<IAprovacaoDTO>;

            if (aprovacaoOrError.isFailure) {
                return res.status(403).send("Erro: " + aprovacaoOrError.errorValue());
            }

            const aprovacaoDTO = aprovacaoOrError.getValue();
            return res.json(aprovacaoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    };

    public async listarTarefasNaoAprovadas(req: Request, res: Response, next: NextFunction) {
        try {
            const aprovacoesOrError = await this.aprovacaoServiceInstance.listarRequisicoesNaoAprovadas() as Result<IAprovacaoDTO[]>;

            if (aprovacoesOrError.isFailure) {
                return res.status(404).send("Erro: " + aprovacoesOrError.errorValue());
            }

            const aprovacoesDTO = aprovacoesOrError.getValue()
            return res.json(aprovacoesDTO).status(201);
        } catch (e) {
            return next(e);
        }
    };

    public async listarPorEstado(req: Request, res: Response, next: NextFunction) {
        try {
            const estado : IEstadoDTO = {estado : req.query.estado as string}
            const aprovacoesOrError = await this.aprovacaoServiceInstance.listarPorEstado(estado as IEstadoDTO) as Result<IAprovacaoDTO[]>;
            console.log(aprovacoesOrError);
            if (aprovacoesOrError.isFailure) {
                return res.status(404).send("Erro: " + aprovacoesOrError.errorValue());
            }

            const aprovacoesDTO = aprovacoesOrError.getValue()
            return res.json(aprovacoesDTO).status(201);
        } catch (e) {
            return next(e);
        }
    };

    public async listarPorTipoDispositivo(req: Request, res: Response, next: NextFunction) {
        try {
            const tipoDispositivo : ITipoDispositivoDTO = {tipoDispositivo : req.query.tipoDispositivo as string}
            const aprovacoesOrError = await this.aprovacaoServiceInstance.listarPorTipoDispositivo(tipoDispositivo) as Result<IAprovacaoDTO[]>;

            if (aprovacoesOrError.isFailure) {
                return res.status(404).send("Erro: " + aprovacoesOrError.errorValue());
            }

            const aprovacoesDTO = aprovacoesOrError.getValue()
            return res.json(aprovacoesDTO).status(201);
        } catch (e) {
            return next(e);
        }
    };

    public async listarPorUtente(req: Request, res: Response, next: NextFunction) {
        try {
            const utente : IUtenteDTO = {utente : req.query.utente as string}
            const aprovacoesOrError = await this.aprovacaoServiceInstance.listarPorUtente(utente) as Result<IAprovacaoDTO[]>;

            if (aprovacoesOrError.isFailure) {
                return res.status(404).send("Erro: " + aprovacoesOrError.errorValue());
            }

            const aprovacoesDTO = aprovacoesOrError.getValue()
            return res.json(aprovacoesDTO).status(201);
        } catch (e) {
            return next(e);
        }
    };

    public async sequenciaTarefasAprovadas(req: Request, res: Response, next: NextFunction){
        try {
            const sequenciaOrError = await this.aprovacaoServiceInstance.sequenciaTarefasAprovadas() as Result<ISequenciaDTO>;

            if (sequenciaOrError.isFailure) {
                return res.status(404).send("Erro: " + sequenciaOrError.errorValue());
            }

            const sequenciaDTO = sequenciaOrError.getValue()
            return res.json(sequenciaDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }
}