
import { Result } from "../../core/logic/Result";
import IAprovacaoDTO from "../../dto/IAprovacaoDTO";
import IAprovarDTO from "../../dto/IAprovarDTO";
import IEstadoDTO from "../../dto/IEstadoDTO";
import ISequenciaDTO from "../../dto/ISequenciaDTO";
import ITipoDispositivoDTO from "../../dto/ITipoDispositivoDTO";
import IUtenteDTO from "../../dto/IUtenteDTO";

export default interface IAprovacaoService {
  aceitarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>>;
  recusarRequisicao(aprovacaoDTO: IAprovarDTO): Promise<Result<IAprovacaoDTO>>;
  
  listarRequisicoesNaoAprovadas(): Promise<Result<IAprovacaoDTO[]>>;

  listarPorEstado(estadoDTO: IEstadoDTO): Promise<Result<IAprovacaoDTO[]>>;
  listarPorTipoDispositivo(tipoDispositivoDTO: ITipoDispositivoDTO): Promise<Result<IAprovacaoDTO[]>>;
  listarPorUtente(utenteDTO: IUtenteDTO): Promise<Result<IAprovacaoDTO[]>>;

  sequenciaTarefasAprovadas(): Promise<Result<ISequenciaDTO>>;
}