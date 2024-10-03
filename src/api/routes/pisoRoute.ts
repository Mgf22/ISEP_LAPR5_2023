import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPisoController from '../../controllers/IControllers/IPisoController'; 

import config from "../../../config";
import IMapaPisoController from '../../controllers/IControllers/IMapaPisoController';
var authorize = require ("../middlewares/validateToken")


const route = Router();

export default (app: Router) => {
  app.use('/piso', route);

  const ctrl = Container.get(config.controllers.piso.name) as IPisoController;
  const ctrl2 = Container.get(config.controllers.mapaPiso.name) as IMapaPisoController;

  // Criar novo piso.
  route.post('/createPiso', authorize('GestorCampus'),
  celebrate({
    body: Joi.object({
      descricao: Joi.string(),
      designacao: Joi.string().required(),
      edificio: Joi.string().required()
    })
  }),
  (req, res, next) => ctrl.createPiso(req, res, next));

    // List pisos de um edifício.
    route.get('/listPisos/:codigoEdificio', //authorize('GestorCampus', 'Utente'),
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.listPisos(req, res, next));

  // Update piso existente.
  route.put('/updatePiso', authorize('GestorCampus'),
  celebrate({
    body: Joi.object({
      descricao: Joi.string(),
      designacao: Joi.string(),
      edificio: Joi.string()
    }),
  }),
  (req, res, next) => ctrl.updatePiso(req, res, next));

    route.delete('/deletePiso', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
        designacao: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.deletePiso(req, res, next));

    route.get('/listPisosGeral', /*authorize('GestorCampus'),*/
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.listPisosGeral(req, res, next));

    route.get('/listPisosGeral2', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl.listPisosGeral2(req, res, next));
};