import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITarefaController from '../../controllers/IControllers/ITarefaController';

const route = Router();

export default (app: Router) => {
  app.use('/tarefas', route);

  const ctrl = Container.get(config.controllers.tarefa.name) as ITarefaController;

  route.post('/requisitar',
    celebrate({
      body: Joi.object({
        tipoDispositivo: Joi.string(),
        tarefa: Joi.string().required(),
        tipoTarefa: Joi.string().required(),
        pontoInicio: Joi.string().required(),
        pontoTermino: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.requisitar(req, res, next));

};