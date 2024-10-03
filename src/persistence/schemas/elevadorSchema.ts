import { IElevadorPersistence } from '../../dataschema/IElevadorPersistence';
import mongoose from 'mongoose';

const ElevadorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    descricao: { type: String, unique: false },
    numeroSerie: { type: String, unique: true },
    marca: { type: String, unique: false },
    modelo: { type: String, unique: false },
    pisosServidos: { type: [String], unique: false},
    numeroIdentificativo: { type: Number, unique: true},
    edificio: { type: String, unique: false},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IElevadorPersistence & mongoose.Document>('Elevador', ElevadorSchema);
