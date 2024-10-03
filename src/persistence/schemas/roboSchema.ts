import { IRoboPersistence } from '../../dataschema/IRoboPersistence';
import mongoose from 'mongoose';

const RoboSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    estado: { type: String, unique: false },
    marca: { type: String, unique: false },
    codigo: { type: String, unique: true },
    numeroSerie: { type: String, unique: true },
    nickname: { type: String, unique: false },
    tipoRobo: { type: String, unique: false },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRoboPersistence & mongoose.Document>('Robo', RoboSchema);