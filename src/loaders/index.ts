import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

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

  const edificioSchema = {
    // compare with the approach followed in repos and services
    name: 'edificioSchema',
    schema: '../persistence/schemas/edificioSchema',
  };

  const elevadorSchema = {
    // compare with the approach followed in repos and services
    name: 'elevadorSchema',
    schema: '../persistence/schemas/elevadorSchema',
  };

  const passagemSchema = {
    // compare with the approach followed in repos and services
    name: 'passagemSchema',
    schema: '../persistence/schemas/passagemSchema',
  };

  const mapaPisoSchema = {
    // compare with the approach followed in repos and services
    name: 'mapaPisoSchema',
    schema: '../persistence/schemas/mapaPisoSchema',
  };

  const pisoSchema = {
    // compare with the approach followed in repos and services
    name: 'pisoSchema',
    schema: '../persistence/schemas/pisoSchema',
  };

  const roboSchema = {
    // compare with the approach followed in repos and services
    name: 'roboSchema',
    schema: '../persistence/schemas/roboSchema',
  };

  const tipoRoboSchema = {
    // compare with the approach followed in repos and services
    name: 'tipoRoboSchema',
    schema: '../persistence/schemas/tipoRoboSchema',
  };

  const salaSchema = {
    // compare with the approach followed in repos and services
    name: 'salaSchema',
    schema: '../persistence/schemas/salaSchema',
  };

  const tarefaSchema = {
    // compare with the approach followed in repos and services
    name: 'tarefaSchema',
    schema: '../persistence/schemas/tarefaSchema',
  };

  const aprovacaoController = {
    name: config.controllers.aprovacao.name,
    path: config.controllers.aprovacao.path
  }

  const pedidoController = {
    name: config.controllers.pedido.name,
    path: config.controllers.pedido.path
  }

  const tarefaAprovacaoController = {
    name: config.controllers.tarefaAprovacao.name,
    path: config.controllers.tarefaAprovacao.path
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const tarefaController = {
    name: config.controllers.tarefa.name,
    path: config.controllers.tarefa.path
  }

  const mapaPisoController = {
    name: config.controllers.mapaPiso.name,
    path: config.controllers.mapaPiso.path
  }

  const edificioController = {
    name: config.controllers.edificio.name,
    path: config.controllers.edificio.path
  }

  const elevadorController = {
    name: config.controllers.elevador.name,
    path: config.controllers.elevador.path
  }

  const passagemController = {
    name: config.controllers.passagem.name,
    path: config.controllers.passagem.path
  }

  const pisoController = {
    name: config.controllers.piso.name,
    path: config.controllers.piso.path
  }

  const roboController = {
    name: config.controllers.robo.name,
    path: config.controllers.robo.path
  }

  const salaController = {
    name: config.controllers.sala.name,
    path: config.controllers.sala.path
  }

  const tipoRoboController = {
    name: config.controllers.tipoRobo.name,
    path: config.controllers.tipoRobo.path
  }

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }

  const tarefaRepo = {
    name: config.repos.tarefa.name,
    path: config.repos.tarefa.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const mapaPisoRepo = {
    name: config.repos.mapaPiso.name,
    path: config.repos.mapaPiso.path
  }

  const edificioRepo = {
    name: config.repos.edificio.name,
    path: config.repos.edificio.path
  }

  const elevadorRepo = {
    name: config.repos.elevador.name,
    path: config.repos.elevador.path
  }

  const passagemRepo = {
    name: config.repos.passagem.name,
    path: config.repos.passagem.path
  }

  const pisoRepo = {
    name: config.repos.piso.name,
    path: config.repos.piso.path
  }

  const roboRepo = {
    name: config.repos.robo.name,
    path: config.repos.robo.path
  }

  const salaRepo = {
    name: config.repos.sala.name,
    path: config.repos.sala.path
  }

  const tipoRoboRepo = {
    name: config.repos.tipoRobo.name,
    path: config.repos.tipoRobo.path
  }

  const aprovacaoService = {
    name: config.services.aprovacao.name,
    path: config.services.aprovacao.path
  }

  const tarefaAprovacaoService = {
    name: config.services.tarefaAprovacao.name,
    path: config.services.tarefaAprovacao.path
  }

  const tarefaService = {
    name: config.services.tarefa.name,
    path: config.services.tarefa.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const mapaPisoService = {
    name: config.services.mapaPiso.name,
    path: config.services.mapaPiso.path
  }

  const edificioService = {
    name: config.services.edificio.name,
    path: config.services.edificio.path
  }

  const elevadorService = {
    name: config.services.elevador.name,
    path: config.services.elevador.path
  }

  const passagemService = {
    name: config.services.passagem.name,
    path: config.services.passagem.path
  }

  const pisoService = {
    name: config.services.piso.name,
    path: config.services.piso.path
  }

  const roboService = {
    name: config.services.robo.name,
    path: config.services.robo.path
  }

  const salaService = {
    name: config.services.sala.name,
    path: config.services.sala.path
  }

  const tipoRoboService = {
    name: config.services.tipoRobo.name,
    path: config.services.tipoRobo.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  const pedidoService = {
    name: config.services.pedido.name,
    path: config.services.pedido.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      roleSchema,
      edificioSchema,
      elevadorSchema,
      passagemSchema,
      pisoSchema,
      roboSchema,
      salaSchema,
      tipoRoboSchema,
      mapaPisoSchema,
      tarefaSchema,
      userSchema,
    ],
    controllers: [
      aprovacaoController,
      tarefaAprovacaoController,
      roleController,
      edificioController,
      elevadorController,
      passagemController,
      pisoController,
      roboController,
      salaController,
      tipoRoboController,
      mapaPisoController,
      tarefaController,
      userController,
      pedidoController
    ],
    repos: [
      roleRepo,
      edificioRepo,
      elevadorRepo,
      passagemRepo,
      pisoRepo,
      roboRepo,
      salaRepo,
      tipoRoboRepo,
      mapaPisoRepo,
      tarefaRepo,
      userRepo
    ],
    services: [
      aprovacaoService,
      tarefaAprovacaoService,
      roleService,
      edificioService,
      elevadorService,
      passagemService,
      pisoService,
      roboService,
      salaService,
      tipoRoboService,
      mapaPisoService,
      tarefaService,
      userService,
      pedidoService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
