import { Service, Inject } from 'typedi';
import { Document, FilterQuery, Model } from 'mongoose';
import { ITarefaPersistence } from '../dataschema/ITarefaPersistence';
import ITarefaRepo from '../services/IRepos/ITarefaRepo';
import { TarefaId } from '../domain/tarefaId';
import { Tarefa } from '../domain/tarefa';
import { TarefaMap } from '../mappers/TarefaMap';

@Service()
export default class TarefaRepo implements ITarefaRepo {
  private models: any;

  constructor(
    @Inject('tarefaSchema') private tarefaSchema : Model<ITarefaPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async save (tarefa: Tarefa): Promise<Tarefa> {
    const query = { domainId: tarefa.id.toString()}; 

    const roleDocument = await this.tarefaSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const raw: any = TarefaMap.toPersistence(tarefa);

        const tarefaCreated = await this.tarefaSchema.create(raw);

        return TarefaMap.toDomain(tarefaCreated);
      } else {

 
        await roleDocument.save();
        return tarefa;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (tarefaId: TarefaId | string): Promise<Tarefa> {
    const query = { domainId: tarefaId};
    const tarefaRecord = await this.tarefaSchema.findOne( query as FilterQuery<ITarefaPersistence & Document> );

    if( tarefaRecord != null) {
      return TarefaMap.toDomain(tarefaRecord);
    }
    else
      return null;
  }

  public async findByDesignacao(value: string): Promise<Tarefa> {
    const query = { tipoTarefa: value };
    const tarefaRecord = await this.tarefaSchema.findOne(query as FilterQuery<ITarefaPersistence & Document>);

    if (tarefaRecord != null) {
      let tarefaDoc = await TarefaMap.toDomain(tarefaRecord)
      return tarefaDoc;
    }
    else
      return null;
  }

  public async exists(tarefa: Tarefa): Promise<boolean> {
    
    const idX = tarefa.id instanceof TarefaId ? (<TarefaId>tarefa.id) : tarefa.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.tarefaSchema.findOne( query as FilterQuery<ITarefaPersistence & Document>);

    return !!roleDocument === true;
  }

  public async delete(tarefa: Tarefa): Promise<Tarefa> {
    try {
      const query = { tipoTarefa: tarefa.tipoTarefa };
      const tarefaRecord = await this.tarefaSchema.deleteOne(query as FilterQuery<ITarefaPersistence & Document>);

      return tarefa;
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<Tarefa[]> {
    const query = {};
    const tarefaSchema = await this.tarefaSchema.find(query);
    try {
      if (tarefaSchema === null) {
          return null;
      } else {
          let tarefaArray: Tarefa[] = [];
          tarefaSchema.forEach(async v => tarefaArray.push(await TarefaMap.toDomain(v)));
          return tarefaArray;
      }
  } catch (err) {
      throw err;
  }
}
  

 
}