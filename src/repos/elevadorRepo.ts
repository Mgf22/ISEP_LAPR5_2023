import { Service, Inject } from 'typedi';

import IElevadorRepo from "../services/IRepos/IElevadorRepo";
import { Elevador } from "../domain/elevador";
import { ElevadorId } from "../domain/elevadorId";
import { ElevadorMap } from "../mappers/ElevadorMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IElevadorPersistence } from '../dataschema/IElevadorPersistence';

@Service()
export default class ElevadorRepo implements IElevadorRepo {
  private models: any;

  constructor(
    @Inject('elevadorSchema') private elevadorSchema : Model<IElevadorPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(role: Elevador): Promise<boolean> {
    
    const idX = role.id instanceof ElevadorId ? (<ElevadorId>role.id).toValue() : role.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.elevadorSchema.findOne( query as FilterQuery<IElevadorPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (elevador: Elevador): Promise<Elevador> {
    const query = { domainId: elevador.id.toString()}; 

    const roleDocument = await this.elevadorSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = ElevadorMap.toPersistence(elevador);

        const roleCreated = await this.elevadorSchema.create(rawRole);

        return ElevadorMap.toDomain(roleCreated);
      } else {

        let pisos : string[] = [];
        elevador.pisosServidos.forEach(p => pisos.push(p.designacao));

        roleDocument.descricao = elevador.descricao;
        roleDocument.numeroSerie = elevador.numeroSerie;
        roleDocument.modelo = elevador.modelo;
        roleDocument.marca = elevador.marca;
        roleDocument.pisosServidos = pisos;
        roleDocument.numeroIdentificativo = elevador.numeroIdentificativo;
        roleDocument.edificio = elevador.edificio.codigo;
        await roleDocument.save();

        return elevador;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roleId: ElevadorId | string): Promise<Elevador> {
    const query = { domainId: roleId};
    const roleRecord = await this.elevadorSchema.findOne( query as FilterQuery<IElevadorPersistence & Document> );

    if( roleRecord != null) {
      return ElevadorMap.toDomain(roleRecord);
    }
    else
      return null;
  }
  

  public async findByNumeroIdentificativo(codigo: number): Promise<Elevador> {
      const query = { numeroIdentificativo : codigo };
      const elevadorRecord = await this.elevadorSchema.findOne(query as FilterQuery<IElevadorPersistence & Document>);

      if(elevadorRecord != null)
        return ElevadorMap.toDomain(elevadorRecord);
      else
        return null;
  }

  public async findByEdificio(codigoEdificio: string): Promise<Elevador>{
    const query = { edificio: codigoEdificio };
      const elevadorRecord = await this.elevadorSchema.findOne(query as FilterQuery<IElevadorPersistence & Document>);

      if(elevadorRecord != null)
        return ElevadorMap.toDomain(elevadorRecord);
      else
        return null;
  }

  public async delete(elevador: Elevador) : Promise<Elevador>{
    try{
      const query = { numeroIdentificativo: elevador.numeroIdentificativo}; 
      const elevadorRecord = await this.elevadorSchema.deleteOne(query as FilterQuery<IElevadorPersistence & Document>);
      
      return elevador;
    }catch(err){
      throw err;
    }
  }

  public async findAll(): Promise<Elevador[]> {
      try{
        const query = {};
        const elevadorRecords = await this.elevadorSchema.find(query as FilterQuery<IElevadorPersistence & Document>);

        let elevadores : Elevador[] = [];
        for(const elevador of elevadorRecords){
          const e = await ElevadorMap.toDomain(elevador);
          elevadores.push(e);
        }

        return elevadores;
      }catch(err){
        throw err;
      }
  }
}