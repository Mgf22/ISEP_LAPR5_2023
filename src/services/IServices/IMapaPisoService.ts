import { Result } from "../../core/logic/Result";
import ICaminhoEntrePisosSolDTO from "../../dto/ISolucaoCaminhoDTO";
import IMapaPisoDTO from "../../dto/IMapaPisoDTO";
import IMazeDTO from "../../dto/IMazeDTO";
import IDeleteMapaPisoDTO from "../../dto/IDeleteMapaPisoDTO";
import ISolucaoCaminhoDTO from "../../dto/ISolucaoCaminhoDTO";
import ICaminhoEntrePisosDTO from "../../dto/ICaminhoEntrePisosDTO"
import IListMapasPisoDTO from "../../dto/IListMapaPisoDTO";
import IMapaJsonDTO from "../../dto/IMapaJsonDTO";


export default interface IMapaPisoService  {
    createMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>>;
    loadMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>>;
    deleteMapaPiso(piso: IDeleteMapaPisoDTO): Promise<Result<IMapaPisoDTO>>;
    listMapasPiso(): Promise<Result<IMazeDTO[]>>;
    caminhoEntrePisos(cep: ICaminhoEntrePisosDTO): Promise<Result<ISolucaoCaminhoDTO>>;
    listMapaPiso(piso: IListMapasPisoDTO): Promise<Result<IMapaJsonDTO>>;
}
