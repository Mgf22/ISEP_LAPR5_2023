import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITipoRoboController from '../../controllers/IControllers/ITipoRoboController'; 

import config from "../../../config";
var authorize = require ("../middlewares/validateToken")

const route = Router();

export default (app: Router) => {
  app.use('/tipoRobo', route);

  const ctrl = Container.get(config.controllers.tipoRobo.name) as ITipoRoboController;

  // Criar novo tipo de robo.
  route.post('/createTipoRobo', authorize('GestorFrota'),
  celebrate({
    body: Joi.object({
      designacao: Joi.string().required(),
      marca: Joi.string().required(),
      modelo: Joi.string().required(),
      tarefas: Joi.array().items(Joi.string()).min(1).max(20).required()
    })
  }),
  (req, res, next) => ctrl.createTipoRobo(req, res, next));

  // Update tipo robo existente. (verificar se existe UC para isto).
  route.put('/updateTipoRobo', authorize('GestorFrota'),
  celebrate({
    body: Joi.object({
        designacao: Joi.string().required(),
        marca: Joi.string().required(),
        modelo: Joi.string().required(),
        tarefas: Joi.array().items(Joi.string()).min(1).max(20).required()
    }),
  }),
  (req, res, next) => ctrl.updateTipoRobo(req, res, next));

  route.get('/listTipoRobo', authorize('GestorFrota'),
 celebrate({
   body: Joi.object({
   }),
 }),
 (req, res, next) => ctrl.listTipoRobo(req, res, next));

  route.delete('/deleteTipoRobo', authorize('GestorFrota'),
    celebrate({
      body: Joi.object({
        designacao: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.deleteTipoRobo(req, res, next));
};