import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import IAprovacaoRepo from '../services/IRepos/IAprovacaoRepo';
import { IAprovacaoPersistence } from '../dataschema/IAprovacaoPersistence';
import { Aprovacao } from '../domain/aprovacao';
import { AprovacaoMap } from '../mappers/AprovacaoMap';
import { AprovacaoId } from '../domain/aprovacaoId';

@Service()
export default class AprovacaoRepo implements IAprovacaoRepo {
    private models: any;

    constructor(
        @Inject('aprovacaoSchema') private aprovacaoSchema: Model<IAprovacaoPersistence & Document>,
    ) { }

    public async exists(aprovacao: Aprovacao): Promise<boolean> {

        const idX = aprovacao.id instanceof AprovacaoId ? (<AprovacaoId>aprovacao.id).toValue() : aprovacao.id;

        const query = { domainId: idX };
        const tarefaDocument = await this.aprovacaoSchema.findOne(query as FilterQuery<IAprovacaoPersistence & Document>);

        return !!tarefaDocument === true;
    }

    public async save(aprovacao: Aprovacao): Promise<Aprovacao> {
        const query = { domainId: aprovacao.id.toString() };

        const aprovacaoDocument = await this.aprovacaoSchema.findOne(query);

        try {
            if (aprovacaoDocument === null) {
                const rawAprovacao: any = AprovacaoMap.toPersistence(aprovacao);

                const aprovacaoCreated = await this.aprovacaoSchema.create(rawAprovacao);

                return AprovacaoMap.toDomain(aprovacaoCreated);
            } else {

                aprovacaoDocument.estado = aprovacao.estado;
                aprovacaoDocument.requisitante = aprovacao.requisitante;
                aprovacaoDocument.tipoDispositivo = aprovacao.tipoDispositivo;
                aprovacaoDocument.tarefa = aprovacao.tarefa.designacaoTarefa;
                await aprovacaoDocument.save();

                return aprovacao;
            }
        } catch (err) {
            throw err;
        }
    }

    public async listarRequisicoesNaoAprovadas(): Promise<Aprovacao[]> {
        const query = { estado: "pendente" };
        const aprovacoes = await this.aprovacaoSchema.find(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacoes.length == 0)
            return null;

        let requisicoesNaoAprovadas: Aprovacao[] = [];
        for (let i = 0; i < aprovacoes.length; i++) {
            const v2 = await AprovacaoMap.toDomain(aprovacoes[i]);
            requisicoesNaoAprovadas.push(v2);
        }

        return requisicoesNaoAprovadas;
    }

    public async findByDomainId(aprovacaoId: AprovacaoId | string): Promise<Aprovacao> {
        const query = { domainId: aprovacaoId };
        const aprovacaoRecord = await this.aprovacaoSchema.findOne(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacaoRecord != null) {
            return AprovacaoMap.toDomain(aprovacaoRecord);
        }
        else
            return null;
    }

    public async findByTarefaName(designacaoTarefa: string): Promise<Aprovacao> {
        const query = { $and: [{ tarefa: designacaoTarefa }, { estado: 'pendente' }] };
        const aprovacaoRecord = await this.aprovacaoSchema.findOne(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacaoRecord != null) {
            return AprovacaoMap.toDomain(aprovacaoRecord);
        } else {
            return null;
        }
    }

    public async listarPorEstado(estado: string): Promise<Aprovacao[]> {
        const query = { estado: estado };
        const aprovacoes = await this.aprovacaoSchema.find(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacoes.length == 0)
            return null;

        let requisicoesNaoAprovadas: Aprovacao[] = [];
        for (let i = 0; i < aprovacoes.length; i++) {
            const v2 = await AprovacaoMap.toDomain(aprovacoes[i]);
            requisicoesNaoAprovadas.push(v2);
        }

        return requisicoesNaoAprovadas;
    }

    public async listarPorTipoDispositivo(tipoDispositivo: string): Promise<Aprovacao[]> {
        const query = { tipoDispositivo: tipoDispositivo };
        const aprovacoes = await this.aprovacaoSchema.find(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacoes.length == 0)
            return null;

        let requisicoesNaoAprovadas: Aprovacao[] = [];
        for (let i = 0; i < aprovacoes.length; i++) {
            const v2 = await AprovacaoMap.toDomain(aprovacoes[i]);
            requisicoesNaoAprovadas.push(v2);
        }

        return requisicoesNaoAprovadas;
    }

    public async listarPorUtente(utente: string): Promise<Aprovacao[]> {
        const query = { requisitante: utente };
        const aprovacoes = await this.aprovacaoSchema.find(query as FilterQuery<IAprovacaoPersistence & Document>);

        if (aprovacoes.length == 0)
            return null;

        let requisicoesNaoAprovadas: Aprovacao[] = [];
        for (let i = 0; i < aprovacoes.length; i++) {
            const v2 = await AprovacaoMap.toDomain(aprovacoes[i]);
            requisicoesNaoAprovadas.push(v2);
        }

        return requisicoesNaoAprovadas;
    }


}