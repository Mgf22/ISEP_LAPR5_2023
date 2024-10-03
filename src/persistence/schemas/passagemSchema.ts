import { IPassagemPersistence } from '../../dataschema/IPassagemPersistence';
import mongoose from 'mongoose';

const PassagemSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    designacao: { type: String, unique: true }, 
    edificioA: { type: String, unique: false},
    edificioB: { type: String, unique: false},
    pisoA: { type: String, unique: false},
    pisoB: { type: String, unique: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPassagemPersistence & mongoose.Document>('Passagem', PassagemSchema);
