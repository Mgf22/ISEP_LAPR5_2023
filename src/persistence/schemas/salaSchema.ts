import { ISalaPersistence } from '../../dataschema/ISalaPersistence';
import mongoose from 'mongoose';

const SalaSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    descricaoSala: { type: String, unique: false },
    categoriaSala: { type: String, unique: false },
    designacaoSala: { type: String, unique: true },
    piso: { type: String, unique: false}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ISalaPersistence & mongoose.Document>('Sala', SalaSchema);
