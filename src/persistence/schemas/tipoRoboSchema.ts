import { ITipoRoboPersistence } from '../../dataschema/ITipoRoboPersistence';
import mongoose from 'mongoose';

const TipoRoboSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    designacao: { type: String, unique: true},
    marca: { type: String, unique: false },
    modelo: { type: String, unique: false },
    tarefas: { type: [String], unique: false},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITipoRoboPersistence & mongoose.Document>('TipoRobo', TipoRoboSchema);
