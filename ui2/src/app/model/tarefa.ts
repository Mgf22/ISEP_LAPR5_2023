import { Aprovacao } from "./aprovacao";

export interface Tarefa {
    destino: string;
    origem: string;
    tipoTarefa : string;
    requisicao: Aprovacao;
}