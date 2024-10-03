import { IPisoPersistence } from '../../dataschema/IPisoPersistence';
import mongoose from 'mongoose';

const Piso = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: false
    },

    descricao: {
      type: String,
      index: true,
    },

    designacao: {
      type: String,
      required: [true, 'Introduza designação'],
      index: true,
      unique: true
    },

    edificio: {
      type: String,
      required: [true, 'Introduza o edificio'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPisoPersistence & mongoose.Document>('Piso', Piso);
