import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import aprovacao from './routes/aprovacaoRoute'
import tarefa from './routes/tarefaRoute'

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	aprovacao(app);
	tarefa(app);
	
	return app
}