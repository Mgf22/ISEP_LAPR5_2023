import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { AprovacaoId } from "./aprovacaoId";

import { Tarefa } from "./tarefa";
import { Guard } from "../core/logic/Guard";

interface AprovacaoProps {
    estado: string;
    requisitante: string;
    tipoDispositivo: string;
    tarefa: Tarefa
}

export class Aprovacao extends AggregateRoot<AprovacaoProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get aprovacaoId(): AprovacaoId {
        return new AprovacaoId(this.aprovacaoId.toValue());
    }

    get estado(): string {
        return this.props.estado;
    }

    get requisitante(): string {
        return this.props.requisitante;
    }

    get tipoDispositivo(): string {
        return this.props.tipoDispositivo;
    }

    get tarefa(): Tarefa {
        return this.props.tarefa;
    }

    set estado(value: string) {
        this.props.estado = value;
    }

    set requisitante(value: string) {
        this.props.requisitante = value;
    }

    set tipoDispositivo(value: string) {
        this.props.tipoDispositivo = value;
    }

    set tarefa(value: Tarefa) {
        this.props.tarefa = value;
    }

    public aceita(){
        this.estado = 'aceite';
    }

    public rejeita(){
        this.estado = 'não aceite';
    }

    public executa(){
        this.estado = 'executado';
    }

    private constructor(props: AprovacaoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: AprovacaoProps, id?: UniqueEntityID): Result<Aprovacao> {
        
        const guardedProps = [
            { argument: props.tipoDispositivo, argumentName: 'tipoDispositivo' },
            { argument: props.requisitante, argumentName: 'requisitante' },
            { argument: props.estado, argumentName: 'estado' },
            { argument: props.tarefa, argumentName: 'tarefa' }
          ];
      
          const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
      
          if (!guardResult.succeeded) {
            return Result.fail<Aprovacao>(guardResult.message)
          }     
          else {
            const aprovacao = new Aprovacao({
              ...props
            }, id);
      
            return Result.ok<Aprovacao>(aprovacao);
          }

    }
}
