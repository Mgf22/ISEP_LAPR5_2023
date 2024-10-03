import { IEdificioPersistence } from '../../dataschema/IEdificioPersistence';
import mongoose from 'mongoose';
import { Elevador } from '../../domain/elevador';

const Edificio = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    codigo: {
      type: String,
      required: [true, 'Introduza o código do edifício'],
      index: true,
      unique: true
    },

    nomeOpcional: {
      type: String,
      required: [false, 'Please enter last name'],
      index: true,
    },

    descricao: {
      type: String,
      lowercase: true,  
      index: true,
    },

    dimensaoMaximaPiso: {
        type: [Number],
        required: [true, 'Introduza a dimensão máxima do piso'],
        index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IEdificioPersistence & mongoose.Document>('Edificio', Edificio);
