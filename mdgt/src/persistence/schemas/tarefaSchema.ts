import { ITarefaPersistence } from '../../dataschema/ITarefaPersistence';
import mongoose from 'mongoose';

const TarefaSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        designacaoTarefa: { type: String, unique: true },
        pontoTermino: { type: String },
        pontoInicial: { type: String },
        tipoTarefa: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITarefaPersistence & mongoose.Document>('Tarefa', TarefaSchema);
