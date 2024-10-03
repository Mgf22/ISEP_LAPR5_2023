import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import ITarefaController from '../../controllers/IControllers/ITarefaController';
var authorize = require ("../middlewares/validateToken")

const route = Router();

export default (app: Router) => {
  app.use('/tarefa', route);

  const ctrl = Container.get(config.controllers.tarefa.name) as ITarefaController;

  // Criar novo tipo de robo.
  route.post('/createTarefa', authorize('GestorTarefas'),
  celebrate({
    body: Joi.object({
      tipoTarefa: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createTarefa(req, res, next));

  route.delete('/deleteTarefa', authorize('GestorTarefas'),
    celebrate({
      body: Joi.object({
        tipoTarefa: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.deleteTarefa(req, res, next));

    route.get('/listTarefas', authorize('GestorTarefas'),
  celebrate({
    body: Joi.object({
    }),
  }),
  (req, res, next) => ctrl.listTarefas(req, res, next));
};