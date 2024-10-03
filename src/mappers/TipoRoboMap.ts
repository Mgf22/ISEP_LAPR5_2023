import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITipoRoboPersistence } from '../dataschema/ITipoRoboPersistence';

import ITipoRoboDTO from "../dto/ITipoRoboDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { TipoRobo } from "../domain/tipoRobo";
import { Tarefa } from "../domain/tarefa";
import TarefaRepo from "../repos/tarefaRepo";
import Container from "typedi";


// TODO implementar os métodos.
export class TipoRoboMap extends Mapper<TipoRobo> {
  
  public static toDTO( tipoRobo: TipoRobo): ITipoRoboDTO {

    let tarefas : string[]=[];

    tipoRobo.tarefas.forEach(v => tarefas.push(v.tipoTarefa));

    return {
      "designacao": tipoRobo.designacao,
      "domainId": tipoRobo.id.toString(),
      "marca": tipoRobo.marca,
      "modelo": tipoRobo.modelo,
      "tarefas": tarefas
    } as ITipoRoboDTO;
  }

  public static async toDomain (raw: any): Promise<TipoRobo> {

    let tarefas : Tarefa[]=[];

    const repoTarefa = Container.get(TarefaRepo);

    //raw.tarefas.forEach(async tarefa => tarefas.push(await repoTarefa.findByDomainId(tarefa)));

    for(const t of raw.tarefas){
      const objectTarefa = await repoTarefa.findByDesignacao(t);
      tarefas.push(objectTarefa);
    }

    const passagemOrError = TipoRobo.create({
      designacao: raw.designacao,
      marca: raw.marca,
      modelo: raw.modelo,
      tarefas: tarefas,
    }, new UniqueEntityID(raw.domainId));

    passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

    return passagemOrError.isSuccess ? passagemOrError.getValue() : null;

  }

  public static toPersistence (tipoRobo: TipoRobo): any {

    let tarefas : string[]=[];

    tipoRobo.tarefas.forEach(v => tarefas.push(v.tipoTarefa));

    return {
      domainId: tipoRobo.id,
      marca: tipoRobo.marca,
      modelo: tipoRobo.modelo,
      designacao: tipoRobo.designacao,
      tarefas: tarefas
    }
  }
}