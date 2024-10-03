import { Service, Inject } from 'typedi';

import IPassagemRepo from "../services/IRepos/IPassagemRepo";
import { Passagem } from "../domain/passagem";
import { PassagemId } from "../domain/passagemId";
import { PassagemMap } from "../mappers/PassagemMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPassagemPersistence } from '../dataschema/IPassagemPersistence';

@Service()
export default class PassagemRepo implements IPassagemRepo {
  private models: any;

  constructor(
    @Inject('passagemSchema') private passagemSchema: Model<IPassagemPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(passagem: Passagem): Promise<boolean> {

    const idX = passagem.id instanceof PassagemId ? (<PassagemId>passagem.id).toValue() : passagem.id;

    const query = { domainId: idX };
    const roleDocument = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(passagem: Passagem): Promise<Passagem> {
    const query = { domainId: passagem.id.toString() };

    const passagemDocument = await this.passagemSchema.findOne(query);

    try {
      if (passagemDocument === null) {
        const rawPassagem: any = PassagemMap.toPersistence(passagem);

        const passagemCreated = await this.passagemSchema.create(rawPassagem);

        return PassagemMap.toDomain(passagemCreated);
      } else {
        passagemDocument.edificioA = passagem.edificioA.codigo;
        passagemDocument.edificioB = passagem.edificioB.codigo;
        passagemDocument.pisoA = passagem.pisoA.designacao;
        passagemDocument.pisoB = passagem.pisoB.designacao;
        await passagemDocument.save();

        return passagem;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(passagemId: PassagemId | string): Promise<Passagem> {
    const query = { domainId: passagemId };
    const passagemRecord = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);

    if (passagemRecord != null) {
      return PassagemMap.toDomain(passagemRecord);
    }
    else
      return null;
  }

  public async listPassagensBetween(idEdificioA: string, idEdificioB: string): Promise<Passagem[]> {
    const query = { codigoEdificioA: idEdificioA, codigoEdificioB: idEdificioB }
    const passagemSchema = await this.passagemSchema.find(query);

    try {
      if (passagemSchema === null) {
        return null;
      } else {
        let passagemArray = [];
        for (let i = 0; i < passagemSchema.length; i++) {
          passagemArray[i] = PassagemMap.toDomain(passagemSchema[i]);
        }
        return passagemArray;
      }
    } catch (err) {
      throw err;
    }
  }

  public async listPassagens(idEdificio: string): Promise<Passagem[]> {
    const query = { codigoEdificioA: idEdificio }
    const passagemSchema = await this.passagemSchema.find(query);
    try {
      if (passagemSchema === null) {
        return null;
      } else {
        let passagemArray = [];
        for (let i = 0; i < passagemSchema.length; i++) {
          passagemArray[i] = PassagemMap.toDomain(passagemSchema[i]);
        }
        return passagemArray;
      }
    } catch (err) {
      throw err;
    }

  }

  public async listPassagensGeral(): Promise<Passagem[]>{
    const query = {  }
    const passagemSchema = await this.passagemSchema.find(query);
    try {
      if (passagemSchema === null) {
        return null;
      } else {
        let passagemArray = [];
        for (let i = 0; i < passagemSchema.length; i++) {
          passagemArray[i] = await PassagemMap.toDomain(passagemSchema[i]);
        }
        return passagemArray;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDesignacao(value: string): Promise<Passagem> {
    const query = { designacao: value };
    const passagemRecord = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);

    if (passagemRecord != null){
      let passagemDoc  = await PassagemMap.toDomain(passagemRecord)
      return passagemDoc;
    }
    else
      return null;
  }

  public async delete(passagem: Passagem): Promise<Passagem> {
    try {
      const query = { designacao: passagem.designacao };
      const passagemRecord = await this.passagemSchema.deleteOne(query as FilterQuery<IPassagemPersistence & Document>);

      return passagem;
    } catch (err) {
      throw err;
    }
  }
}