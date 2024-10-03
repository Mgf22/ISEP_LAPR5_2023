import { IAprovacaoPersistence } from '../../dataschema/IAprovacaoPersistence';
import mongoose from 'mongoose';

const AprovacaoSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        tipoDispositivo: { type: String },
        requisitante: { type: String },
        estado: { type: String },
        tarefa: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IAprovacaoPersistence & mongoose.Document>('Aprovacao', AprovacaoSchema);
