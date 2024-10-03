import { Service, Inject } from 'typedi';

import ISalaRepo from "../services/IRepos/ISalaRepo";
import { Sala } from "../domain/sala";
import { SalaId } from "../domain/salaId";
import { SalaMap } from "../mappers/SalaMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ISalaPersistence } from '../dataschema/ISalaPersistence';
import { CategoriaSala } from '../domain/categoriaSala';

@Service()
export default class SalaRepo implements ISalaRepo {
  private models: any;

  constructor(
    @Inject('salaSchema') private salaSchema : Model<ISalaPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(sala: Sala): Promise<boolean> {
    
    const idX = sala.id instanceof SalaId ? (<SalaId>sala.id).toValue() : sala.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.salaSchema.findOne( query as FilterQuery<ISalaPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (sala: Sala): Promise<Sala> {
    const query = { domainId: sala.id.toString()}; 

    const roleDocument = await this.salaSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawSala: any = SalaMap.toPersistence(sala);

        const salaCreated = await this.salaSchema.create(rawSala);

        return SalaMap.toDomain(salaCreated);
      } else {
        roleDocument.designacao = sala.designacao;
        roleDocument.descricao = sala.descricao;
        roleDocument.categoria = sala.categoria;
        roleDocument.piso = sala.piso.designacao;
        await roleDocument.save();

        return sala;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDesignacao (designacao: string): Promise<Sala>{
    const query = { designacaoSala: designacao};
    const salaRecord = await this.salaSchema.findOne(query as FilterQuery<ISalaPersistence & Document>);

    return salaRecord != null ? SalaMap.toDomain(salaRecord) : null;
  }

  public async findByDomainId (salaId: SalaId | string): Promise<Sala> {
    const query = { domainId: salaId};
    const salaRecord = await this.salaSchema.findOne( query as FilterQuery<ISalaPersistence & Document> );

    if( salaRecord != null) {
      return SalaMap.toDomain(salaRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Sala[]> {
    const query = {};
    const salaSchema = await this.salaSchema.find(query);
    try {
      if (salaSchema === null) {
          return null;
      } else {
        let salaArray = [];
        for (let i = 0; i < salaSchema.length; i++) {
          salaArray[i] = await SalaMap.toDomain(salaSchema[i]);
        }return salaArray;
      }
  } catch (err) {
      throw err;
  }
}

public async findByPiso(designacao: string): Promise<Sala[]> {
  const query = {piso : designacao};
  const salaSchema = await this.salaSchema.find(query as FilterQuery<ISalaPersistence & Document>);
  try {
    if (salaSchema === null) {
        return null;
    } else {
      let salaArray = [];
      for (let i = 0; i < salaSchema.length; i++) {
        salaArray[i] = await SalaMap.toDomain(salaSchema[i]);
      }return salaArray;
    }
} catch (err) {
    throw err;
}
}

}