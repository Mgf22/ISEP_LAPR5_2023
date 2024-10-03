import mongoose from 'mongoose';
import { IMapaPisoPersistence } from '../../dataschema/IMapaPisoPersistence';

const MapaPisoSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    piso: { type: String, unique: true},
    mapa: { type: Object, unique: false},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IMapaPisoPersistence & mongoose.Document>('MapaPiso', MapaPisoSchema);
