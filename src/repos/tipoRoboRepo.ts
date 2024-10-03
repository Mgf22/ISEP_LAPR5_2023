import { Service, Inject } from 'typedi';

import ITipoRoboRepo from "../services/IRepos/ITipoRoboRepo";
import { TipoRobo } from "../domain/tipoRobo";
import { TipoRoboId } from "../domain/tipoRoboId";
import { TipoRoboMap } from "../mappers/TipoRoboMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ITipoRoboPersistence } from '../dataschema/ITipoRoboPersistence';

@Service()
export default class TipoRoboRepo implements ITipoRoboRepo {
  private models: any;

  constructor(
    @Inject('tipoRoboSchema') private tipoRoboSchema: Model<ITipoRoboPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(tipoRobo: TipoRobo): Promise<boolean> {

    return null;
  }

  public async save(tipoRobo: TipoRobo): Promise<TipoRobo> {
    const query = { domainId: tipoRobo.id.toString() };

    const tipoRoboDocument = await this.tipoRoboSchema.findOne(query);

    try {
      if (tipoRoboDocument === null) {
        const rawTipoRobo: any = TipoRoboMap.toPersistence(tipoRobo);

        const tipoRoboCreated = await this.tipoRoboSchema.create(rawTipoRobo);

        return TipoRoboMap.toDomain(tipoRoboCreated);
      } else {

        let tarefas: string[] = [];

        tipoRobo.tarefas.forEach(v => {
          tarefas.push(v.tipoTarefa);
        });

        tipoRoboDocument.designacao = tipoRobo.designacao;
        tipoRoboDocument.modelo = tipoRobo.modelo
        tipoRoboDocument.marca = tipoRobo.marca;
        tipoRoboDocument.tarefas = tarefas;

        await tipoRoboDocument.save();

        return tipoRobo;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(roleId: TipoRobo | string): Promise<TipoRobo> {
    return null;
  }

  public async findByDesignacao(value: string): Promise<TipoRobo> {
    const query = { designacao: value.toString() };
    const tipoRoboRecord = await this.tipoRoboSchema.findOne(query);

    if (tipoRoboRecord != null) {
      let tipoRoboDoc = await TipoRoboMap.toDomain(tipoRoboRecord)
      return tipoRoboDoc;
    }
    else
      return null;
  }

  public async delete(tipoRobo: TipoRobo): Promise<TipoRobo> {
    try {
      const query = { designacao: tipoRobo.designacao };
      const tipoRoboRecord = await this.tipoRoboSchema.deleteOne(query as FilterQuery<ITipoRoboPersistence & Document>);

      return tipoRobo;
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<TipoRobo[]> {
    const query = {};
    const tipoRoboSchema = await this.tipoRoboSchema.find(query);
    try {
      if (tipoRoboSchema === null) {
          return null;
      } else {
          let tipoRoboArray: TipoRobo[] = [];
          //roboSchema.forEach(async v => roboArray.push(await RoboMap.toDomain(v)));
          for(const roboDoc of tipoRoboSchema){
            const robo = await TipoRoboMap.toDomain(roboDoc);
            tipoRoboArray.push(robo);
          }
          return tipoRoboArray;
      }
  } catch (err) {
      throw err;
  }
}

}