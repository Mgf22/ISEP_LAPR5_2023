import mongoose from 'mongoose';
import { ITarefaPersistence } from '../../dataschema/ITarefaPersistence';

const tarefaSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    tipoTarefa: { type: String, unique: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITarefaPersistence & mongoose.Document>('Tarefa', tarefaSchema);
