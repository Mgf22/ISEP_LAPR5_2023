import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPisoController from '../../controllers/IControllers/IPisoController'; 

import config from "../../../config";
import IMapaPisoController from '../../controllers/IControllers/IMapaPisoController';
var authorize = require ("../middlewares/validateToken")


const route = Router();

export default (app: Router) => {
  app.use('/mapaPiso', route);

  const ctrl2 = Container.get(config.controllers.mapaPiso.name) as IMapaPisoController;

    route.post('/createMapaPiso', /*authorize('GestorCampus'),*/
  celebrate({
    body: Joi.object({
      mapa : Joi.object().required(),
      piso : Joi.string().required()
    }),
  }),
  (req, res, next) => ctrl2.createMapaPiso(req, res, next));
  

  route.patch('/LoadMapaPiso', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
        mapaPiso : Joi.number()
      }),
    }),
    (req, res, next) => ctrl2.loadMapaPiso(req, res, next));

    route.delete('/deleteMapaPiso', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
        piso: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl2.deleteMapaPiso(req, res, next));

    route.get('/listMapasPiso', /*authorize('GestorCampus'),*/
  celebrate({
    body: Joi.object({
    }),
  }),
  (req, res, next) => ctrl2.listMapasPiso(req, res, next));

  route.get('/caminhoEntrePisos/:origem/:destino',
    celebrate({
      body: Joi.object({
        /*origem: Joi.string().required(),
        posicaoOrigem: Joi.array().items(Joi.number()).min(2).max(2).required(),
        destino: Joi.string().required(),
        posicaoDestino: Joi.array().items(Joi.number()).min(2).max(2).required()*/
      }),
    }), (req, res, next) => ctrl2.caminhoEntrePisos(req, res, next));

    route.get('/listMapaPiso/:piso', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
      }),
    }),
    (req, res, next) => ctrl2.listMapaPiso(req, res, next));
};