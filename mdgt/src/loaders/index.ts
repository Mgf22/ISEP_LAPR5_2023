import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');


  /**
   * Schemas.
   */
  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const tarefaSchema = {
    // compare with the approach followed in repos and services
    name: 'tarefaSchema',
    schema: '../persistence/schemas/tarefaSchema',
  };

  const aprovacaoSchema = {
    // compare with the approach followed in repos and services
    name: 'aprovacaoSchema',
    schema: '../persistence/schemas/aprovacaoSchema',
  };

  /**
   * Controllers.
   */

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const tarefaController = {
    name: config.controllers.tarefa.name,
    path: config.controllers.tarefa.path
  }

  const aprovacaoController = {
    name: config.controllers.aprovacao.name,
    path: config.controllers.aprovacao.path
  }


  /**
   * Repos.
   */
  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const tarefaRepo = {
    name: config.repos.tarefa.name,
    path: config.repos.tarefa.path
  }

  const aprovacaoRepo = {
    name: config.repos.aprovacao.name,
    path: config.repos.aprovacao.path
  }

  /**
   * Services.
   */

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const tarefaService = {
    name: config.services.tarefa.name,
    path: config.services.tarefa.path
  }

  const aprovacaoService = {
    name: config.services.aprovacao.name,
    path: config.services.aprovacao.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      tarefaSchema,
      aprovacaoSchema
    ],
    controllers: [
      roleController,
      aprovacaoController,
      tarefaController
    ],
    repos: [
      roleRepo,
      userRepo,
      tarefaRepo,
      aprovacaoRepo
    ],
    services: [
      roleService,
      aprovacaoService,
      tarefaService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
