import { Service, Inject } from 'typedi';

import IEdificioRepo from "../services/IRepos/IEdificioRepo";
import { Edificio } from '../domain/edificio';
import { EdificioId } from "../domain/edificioId";
import { EdificioMap } from "../mappers/EdificioMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';

@Service()
export default class EdificioRepo implements IEdificioRepo {
  private models: any;
  find: any;

  constructor(
    @Inject('edificioSchema') private edificioSchema : Model<IEdificioPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(edificio: Edificio): Promise<boolean> {
    
    const idX = edificio.id instanceof EdificioId ? (<EdificioId>edificio.id).toValue() : edificio.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.edificioSchema.findOne( query as FilterQuery<IEdificioPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (edificio: Edificio): Promise<Edificio> {
    const query = { domainId: edificio.id.toString()}; 

    const edificioDocument = await this.edificioSchema.findOne( query );

    try {
      if (edificioDocument === null ) {
        const rawEdificio: any = EdificioMap.toPersistence(edificio);

        const edificioCreated = await this.edificioSchema.create(rawEdificio);

        return EdificioMap.toDomain(edificioCreated);
      } else {

        edificioDocument.codigo = edificio.codigo;
        edificioDocument.nomeOpcional = edificio.nomeOpcional;
        edificioDocument.descricao = edificio.descricao;
        edificioDocument.dimensaoMaximaPiso = edificio.dimensaoMaximaPiso;
        await edificioDocument.save();

        return edificio;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (edificioId: EdificioId | string): Promise<Edificio> {
    const query = { domainId: edificioId};
    const edificioRecord = await this.edificioSchema.findOne( query as FilterQuery<IEdificioPersistence & Document> );

    if( edificioRecord != null) {
      return EdificioMap.toDomain(edificioRecord);
    }
    else
      return null;
  }
  

  public async findByCodigo(value: string): Promise<Edificio> {
      const query = { codigo: value };
      const edificioRecord = await this.edificioSchema.findOne(query);

      if(edificioRecord != null)
        return EdificioMap.toDomain(edificioRecord);
      else
        return null;
  }


  public async findAll(): Promise<Edificio[]> {
    const query = {};
    const edificioSchema = await this.edificioSchema.find(query);
    try {
      if (edificioSchema === null) {
          return null;
      } else {
          let edificioArray: Edificio[] = [];
          edificioSchema.forEach(async v => edificioArray.push(await EdificioMap.toDomain(v)));
          return edificioArray;
      }
  } catch (err) {
      throw err;
  }
}

  public async delete(edificio: Edificio) : Promise<Edificio>{
    try{
      const query = { codigoEdificio: edificio.codigo}; 
      const edificioRecord = await this.edificioSchema.deleteOne(query as FilterQuery<IEdificioPersistence & Document>);
    
      return edificio;
    }catch(err){
      throw err;
    }
  }
}