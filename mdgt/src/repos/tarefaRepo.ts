import { Service, Inject } from 'typedi';

import ITarefaRepo from "../services/IRepos/ITarefaRepo";
import { Tarefa } from "../domain/tarefa";
import { TarefaId } from "../domain/tarefaId";
import { TarefaMap } from "../mappers/TarefaMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { ITarefaPersistence } from '../dataschema/ITarefaPersistence';
import { forEach } from 'lodash';

@Service()
export default class TarefaRepo implements ITarefaRepo {
    private models: any;

    constructor(
        @Inject('tarefaSchema') private tarefaSchema: Model<ITarefaPersistence & Document>,
    ) { }

    public async exists(tarefa: Tarefa): Promise<boolean> {

        const idX = tarefa.id instanceof TarefaId ? (<TarefaId>tarefa.id).toValue() : tarefa.id;

        const query = { domainId: idX };
        const tarefaDocument = await this.tarefaSchema.findOne(query as FilterQuery<ITarefaPersistence & Document>);

        return !!tarefaDocument === true;
    }

    public async save(tarefa: Tarefa): Promise<Tarefa> {
        const query = { domainId: tarefa.id.toString() };

        const tarefaDocument = await this.tarefaSchema.findOne(query);

        try {
            if (tarefaDocument === null) {
                const rawTarefa: any = TarefaMap.toPersistence(tarefa);

                const tarefaCreated = await this.tarefaSchema.create(rawTarefa);

                return TarefaMap.toDomain(tarefaCreated);
            } else {

                tarefaDocument.designacaoTarefa = tarefa.designacaoTarefa;
                tarefaDocument.pontoTermino = tarefa.pontoTermino;
                tarefaDocument.pontoInicial = tarefa.pontoInicial;
                tarefaDocument.tipoTarefa = tarefa.tipoTarefa;
                await tarefaDocument.save();

                return tarefa;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(tarefaId: TarefaId | string): Promise<Tarefa> {
        const query = { domainId: tarefaId };
        const tarefaRecord = await this.tarefaSchema.findOne(query as FilterQuery<ITarefaPersistence & Document>);

        if (tarefaRecord != null) {
            return TarefaMap.toDomain(tarefaRecord);
        }
        else
            return null;
    }

    public async findByDesignacao(designacaoTarefa: string): Promise<Tarefa> {
        const query = { designacaoTarefa: designacaoTarefa };
        const tarefaRecord = await this.tarefaSchema.findOne(query as FilterQuery<ITarefaPersistence & Document>);

        if (tarefaRecord != null) {
            return TarefaMap.toDomain(tarefaRecord);
        }
        else
            return null;
    }
}