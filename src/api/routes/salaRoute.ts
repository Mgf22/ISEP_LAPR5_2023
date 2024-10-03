import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ISalaController from '../../controllers/IControllers/ISalaController'; 

import config from "../../../config";
var authorize = require ("../middlewares/validateToken")


const route = Router();

export default (app: Router) => {
  app.use('/sala', route);

  const ctrl = Container.get(config.controllers.sala.name) as ISalaController;

  route.post('/createSala', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
        descricao: Joi.string(),
        categoria: Joi.string(),
        designacao: Joi.string().required(),
        piso: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createSala(req, res, next) );

  route.put('updateSala', authorize('GestorCampus'),
    celebrate({
      body: Joi.object({
        descricao: Joi.string(),
        categoria: Joi.string(),
        designacao: Joi.string().required(),
        piso: Joi.string()
      }),
    }),
    (req, res, next) => ctrl.updateSala(req, res, next) );

    route.get('/listSalas',
  celebrate({
    body: Joi.object({
    }),
  }),
  (req, res, next) => ctrl.listSalas(req, res, next));
  
  route.get('/listSalasPiso/:designacao',
  celebrate({
    body: Joi.object({
      
    }),
  }),
  (req, res, next) => ctrl.listSalasPiso(req, res, next));
};