import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
var validateToken = require ("../middlewares/validateToken")
var authorize = require ("../middlewares/validateToken")
import { Container } from 'typedi';
import IEdificioController from '../../controllers/IControllers/IEdificioController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/edificio', route);

  const ctrl = Container.get(config.controllers.edificio.name) as IEdificioController;

  // Criar novo edificio.
  route.post('/createEdificio', authorize('GestorCampus'),
  celebrate({
    body: Joi.object({
      dimensaoMaximaPiso: Joi.array().items(Joi.number()).min(2).max(2).required(),
      nomeOpcionalEdificio: Joi.string(),
      descricaoEdificio: Joi.string(),
      codigoEdificio: Joi.string().required(),
    })
  }),
  (req, res, next) => ctrl.createEdificio(req, res, next));

  // Update edificio existente.
  route.put('/updateEdificio', authorize('GestorCampus'),
  celebrate({
    body: Joi.object({
        dimensaoMaximaPiso: Joi.array().items(Joi.number()).min(2).max(2),
        nomeOpcionalEdificio: Joi.string(),
        codigoEdificio: Joi.string().required(),
        descricaoEdificio: Joi.string()
    }),
  }),
  (req, res, next) => ctrl.updateEdificio(req, res, next));


  //Mateus: Alterou de put para get
// List todos os edificios
  route.get('/listEdificios', /*authorize('GestorCampus'),*/
  celebrate({
    body: Joi.object({
    }),
  }),
  (req, res, next) => ctrl.listEdificios(req, res, next));


  route.delete('/deleteEdificio', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
        codigoEdificio: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.deleteEdificio(req, res, next));

    route.get('/listMinMax/:min/:max', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.listMinMax(req, res, next));

};