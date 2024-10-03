import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IAprovacaoController from '../../controllers/IControllers/IAprovacaoController';
var authorize = require ("../middlewares/validateToken")


const route = Router();

export default (app: Router) => {
    app.use('/aprovacao', route);

    const ctrl = Container.get(config.controllers.aprovacao.name) as IAprovacaoController;

    route.patch('/aceitarRequisicao', authorize('GestorTarefas'),
        celebrate({
            body: Joi.object({
                tarefa: Joi.string().required(),
            })
        }),
        (req, res, next) => ctrl.aceitarRequisicao(req, res, next));

    route.patch('/recusarRequisicao', authorize('GestorTarefas'),
        celebrate({
            body: Joi.object({
                tarefa: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.recusarRequisicao(req, res, next));

    route.get('/listarTarefasNaoAprovadas', authorize('GestorTarefas'),
        celebrate({
            body: Joi.object({
            })
        }),
        (req, res, next) => ctrl.listarTarefasNaoAprovadas(req, res, next));

    route.get('/pesquisarRequisicaoPorEstado', authorize('GestorTarefas'),
        celebrate({
            query: Joi.object({
                estado: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.listarPorEstado(req, res, next));

    route.get('/pesquisarRequisicaoPorTipoDispositivo', authorize('GestorTarefas'),
        celebrate({
            query: Joi.object({
                tipoDispositivo: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.listarPorTipoDispositivo(req, res, next));

    route.get('/pesquisarRequisicaoPorUtente', authorize('GestorTarefas'),
        celebrate({
            query: Joi.object({
                utente: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.listarPorUtente(req, res, next));

    route.patch('/sequenciaTarefasAprovadas', authorize('GestorTarefas'),
        celebrate({
            body: Joi.object({
            }),
        }),
        (req, res, next) => ctrl.sequenciaTarefasAprovadas(req, res, next));


};