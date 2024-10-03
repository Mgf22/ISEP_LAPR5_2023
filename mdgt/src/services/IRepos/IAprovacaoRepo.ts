import { Repo } from "../../core/infra/Repo";
import { Aprovacao } from "../../domain/aprovacao";
import { AprovacaoId } from "../../domain/aprovacaoId";

export default interface IAprovacaoRepo extends Repo<Aprovacao> {
  save(aprovacao: Aprovacao): Promise<Aprovacao>;
  findByDomainId(aprovacaoId: AprovacaoId | string): Promise<Aprovacao>;
  findByTarefaName(designacaoTarefa: string): Promise<Aprovacao>;
  listarRequisicoesNaoAprovadas(): Promise<Aprovacao[]>;
  listarPorEstado(estado : string): Promise<Aprovacao[]>;
  listarPorTipoDispositivo(tipoDispositivo : string): Promise<Aprovacao[]>;
  listarPorUtente(utente : string): Promise<Aprovacao[]>;
}