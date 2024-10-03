import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 3500, 

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:aed0452dba3a82201f874542@vsgate-s1.dei.isep.ipp.pt:10242/mdgt?authSource=admin",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    tarefa: {
      name: "TarefaController",
      path: "../controllers/tarefaController"
    },
    aprovacao: {
      name: "AprovacaoController",
      path: "../controllers/aprovacaoController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    tarefa: {
      name: "TarefaRepo",
      path: "../repos/tarefaRepo"
    },
    aprovacao: {
      name: "AprovacaoRepo",
      path: "../repos/aprovacaoRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    tarefa: {
      name: "TarefaService",
      path: "../services/tarefaService"
    },
    aprovacao: {
      name: "AprovacaoService",
      path: "../services/aprovacaoService"
    }
  },
};
