import { Result } from "../../core/logic/Result";
import  ICreatingPedidoDTO  from "../../dto/ICreatingPedidoDTO";
import  IPedidoDTO  from "../../dto/IPedidoDTO";

export default interface IPedidoService  {
  criarPedido(userDTO: ICreatingPedidoDTO): Promise<Result<IPedidoDTO>>;
  aprovarPedido(userId: string): Promise<Result<IPedidoDTO>>;
  recusarPedido(userId: string): Promise<Result<IPedidoDTO>>;
  getAllPedidos(): Promise<Result<IPedidoDTO[]>>;
  getAllPedidosPendentes(): Promise<Result<IPedidoDTO[]>>;
  getPedidoById(userId: string): Promise<Result<IPedidoDTO>>;
}
