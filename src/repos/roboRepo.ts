import { Service, Inject } from 'typedi';

import IRoboRepo from "../services/IRepos/IRoboRepo";
import { Robo } from "../domain/robo";
import { RoboId } from "../domain/roboId";
import { RoboMap } from "../mappers/RoboMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoboPersistence } from '../dataschema/IRoboPersistence';

@Service()
export default class RoboRepo implements IRoboRepo {
  private models: any;
  find: any;

  constructor(
    @Inject('roboSchema') private roboSchema : Model<IRoboPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(robo: Robo): Promise<boolean> {
    
    const idX = robo.id instanceof RoboId ? (<RoboId>robo.id).toValue() : robo.id;

    const query = { domainId: idX}; 
    const roboDocument = await this.roboSchema.findOne( query as FilterQuery<IRoboPersistence & Document>);

    return !!roboDocument === true;
  }

  public async save (robo: Robo): Promise<Robo> {
    const query = { domainId: robo.id.toString()}; 

    const roboDocument = await this.roboSchema.findOne( query );

    try {
      if (roboDocument === null ) {
        const rawRobo: any = RoboMap.toPersistence(robo);

        const roboCreated = await this.roboSchema.create(rawRobo);

        return RoboMap.toDomain(roboCreated);
      } else {
        roboDocument.estado = robo.estado,
        roboDocument.marca = robo.marca.value,
        roboDocument.codigo = robo.codigo.value,
        roboDocument.numeroSerie = robo.numeroSerie.value,
        roboDocument.nickname = robo.nickname,
        roboDocument.tipoRobo = robo.tipoRobo.designacao,
        await roboDocument.save();

        return robo;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roboId: RoboId | string): Promise<Robo> {
    const query = { domainId: roboId};
    const roboRecord = await this.roboSchema.findOne( query as FilterQuery<IRoboPersistence & Document> );

    if( roboRecord != null) {
      return RoboMap.toDomain(roboRecord);
    }
    else
      return null;
  }
  

  public async findByCodigo(value: string): Promise<Robo> {
      const query = { codigo: value.toString() };
      const roboRecord = await this.roboSchema.findOne(query);

      if (roboRecord != null){
        let roboDoc  = await RoboMap.toDomain(roboRecord)
        return roboDoc;
      }
      else
        return null;
  }

  public async findAll(): Promise<Robo[]> {
    const query = {};
    const roboSchema = await this.roboSchema.find(query);
    try {
      if (roboSchema != null) {
        let roboArray: Robo[] = [];
        //roboSchema.forEach(async v => roboArray.push(await RoboMap.toDomain(v)));
        for(const roboDoc of roboSchema){
          const robo = await RoboMap.toDomain(roboDoc);
          roboArray.push(robo);
        }
        return roboArray;
      } else {
          return null;
      }
  } catch (err) {
      throw err;
  }
}

public async delete(robo: Robo): Promise<Robo> {
  try {
    const query = { codigo: robo.codigo.value };
    const roboRecord = await this.roboSchema.deleteOne(query as FilterQuery<IRoboPersistence & Document>);

    return robo;
  } catch (err) {
    throw err;
  }
}
}