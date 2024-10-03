import { Service, Inject } from 'typedi';

import IPisoRepo from "../services/IRepos/IPisoRepo";
import { Piso } from "../domain/piso";
import { PisoId } from "../domain/pisoId";
import { PisoMap } from "../mappers/PisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import { CodigoEdificio } from '../domain/codigoEdificio';

@Service()
export default class PisoRepo implements IPisoRepo {
  private models: any;

  constructor(
    @Inject('pisoSchema') private pisoSchema: Model<IPisoPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(piso: Piso): Promise<boolean> {

    const idX = piso.id instanceof PisoId ? (<PisoId>piso.id).toValue() : piso.id;

    const query = { domainId: idX };
    const roleDocument = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(piso: Piso): Promise<Piso> {
    const query = { designacao: piso.designacao };

    const pisoDocument = await this.pisoSchema.findOne(query);

    try {
      if (pisoDocument === null) {
        const rawPiso: any = PisoMap.toPersistence(piso);

        const pisoCreated = await this.pisoSchema.create(rawPiso);

        return PisoMap.toDomain(pisoCreated);
      } else {
        pisoDocument.descricao = piso.descricao;
        pisoDocument.designacao = piso.designacao;
        pisoDocument.edificio = piso.edificio.codigo;
        await pisoDocument.save();

        return piso;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(edificioId: PisoId | string): Promise<Piso> {
    const query = { domainId: edificioId };
    const edificioRecord = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);

    if (edificioRecord != null) {
      return PisoMap.toDomain(edificioRecord);
    }
    else
      return null;
  }


  /*
  public async findByDesignacao(value: string): Promise<Piso> {
      const query = { designacao: value };
      const pisoRecord = await this.pisoSchema.findOne(query);

      if(pisoRecord != null)
        return PisoMap.toDomain(pisoRecord);
      else
        return null;
  }
  */

  public async findByDesignacao(value: string): Promise<Piso> {
    const query = { designacao: value };
    const pisoRecord = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);

    if (pisoRecord != null) {
      let pisoDoc = await PisoMap.toDomain(pisoRecord)
      return pisoDoc;
    }
    else
      return null;
  }

  public async delete(piso: Piso): Promise<Piso> {
    try {
      const query = { designacao: piso.designacao };
      const pisoRecord = await this.pisoSchema.deleteOne(query as FilterQuery<IPisoPersistence & Document>);

      return piso;
    } catch (err) {
      throw err;
    }
  }



  public async findByEdificio(value: string): Promise<Piso[]> {
    const query = { edificio: value };
    const pisoSchema = await this.pisoSchema.find(query as FilterQuery<IPisoPersistence & Document>);
    try {
      if (pisoSchema === null) {
        return null;
      } else {

        let pisoArray = [];
        for (let i = 0; i < pisoSchema.length; i++) {
          const p = await PisoMap.toDomain(pisoSchema[i]);
          pisoArray[i] = p;
        }

        /*
            let pisoArray: Piso[] = [];
            for(const piso of pisoSchema){
              const p = await PisoMap.toDomain(piso);
              pisoArray.push(p);
            }
        */
        return pisoArray;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<Piso[]> {
    const query = {};
    const pisoSchema = await this.pisoSchema.find(query);
    try {
      if (pisoSchema === null) {
        return null;
      } else {
        let pisoArray = [];
        for (let i = 0; i < pisoSchema.length; i++) {
          const p = await PisoMap.toDomain(pisoSchema[i]);
          pisoArray[i] = p;
        }

        //pisoSchema.forEach(async v => pisoArray.push(await PisoMap.toDomain(v)));
        return pisoArray;
      }
    } catch (err) {
      throw err;
    }
  }
}