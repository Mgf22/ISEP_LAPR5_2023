import { Service, Inject } from 'typedi';
import config from "../../config";
import IMapaPisoRepo from './IRepos/IMapaPisoRepo';
import IPisoRepo from './IRepos/IPisoRepo';
import IMapaPisoService from './IServices/IMapaPisoService';
import { Result } from '../core/logic/Result';
import IMapaPisoDTO from '../dto/IMapaPisoDTO';
import { MapaPiso } from '../domain/mapaPiso';
import { MapaPisoMap } from '../mappers/MapaPisoMap';
import IDeleteMapaPisoDTO from '../dto/IDeleteMapaPisoDTO';
import IMazeDTO from '../dto/IMazeDTO';
import IMapaDTO from '../dto/IMapaDTO';
import ISolucaoCaminhoDTO from '../dto/ISolucaoCaminhoDTO';
import { CaminhoEntrePisosSolucao } from '../domain/caminhoEntrePisosSolucao';
import ICaminhoEntrePisosDTO from '../dto/ICaminhoEntrePisosDTO';
import IListMapaPisoDTO from '../dto/IListMapaPisoDTO';
import IMapaJsonDTO from '../dto/IMapaJsonDTO';
const http = require('http');

@Service()
export default class MapaPisoService implements IMapaPisoService {
  constructor(
    @Inject(config.repos.mapaPiso.name) private mapaPisoRepo: IMapaPisoRepo,
    @Inject(config.repos.piso.name) private pisoRepo: IPisoRepo
  ) { }


  public async createMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {

      const mapaPiso = await this.mapaPisoRepo.findByPiso(mapaPisoDTO.piso);

      if (mapaPiso != null)
        return Result.fail<IMapaPisoDTO>("Já existe um piso com o mapa de piso " + mapaPisoDTO.id);

      const piso = await this.pisoRepo.findByDesignacao(mapaPisoDTO.piso);

      const mapaPisoOrError = MapaPiso.create({
        mapa: mapaPisoDTO.mapa,
        piso: piso
      });


      if (mapaPisoOrError.isFailure) {
        return Result.fail<IMapaPisoDTO>(mapaPisoOrError.errorValue());
      }
      const mapaPisoResult = mapaPisoOrError.getValue();
      await this.mapaPisoRepo.save(mapaPisoResult);

      const mapaPisoDTOResult = MapaPisoMap.toDTO(mapaPisoResult) as IMapaPisoDTO;
      return Result.ok<IMapaPisoDTO>(mapaPisoDTOResult)
    } catch (e) {
      throw e;
    }

  }

  public async loadMapaPiso(mapaPisoDTO: IMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {
      const mapaPiso = await this.mapaPisoRepo.findByDomainId(mapaPisoDTO.id);

      if (mapaPiso === null) {
        return Result.fail<IMapaPisoDTO>("Mapa de Piso não encontrado");
      }

      const piso = await this.pisoRepo.findByDesignacao(mapaPisoDTO.piso);

      if (piso == null) {
        return Result.fail<IMapaPisoDTO>("O mapa de piso" + mapaPisoDTO.id + "não tem nenhum piso associado.");

      } else {
        mapaPiso.mapa = mapaPisoDTO.mapa
        await this.mapaPisoRepo.save(mapaPiso);

        const mapaPisoDTOResult = MapaPisoMap.toDTO(mapaPiso) as IMapaPisoDTO;
        return Result.ok<IMapaPisoDTO>(mapaPisoDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async deleteMapaPiso(mapaPisoDTO: IDeleteMapaPisoDTO): Promise<Result<IMapaPisoDTO>> {
    try {
      const mapaPiso = await this.mapaPisoRepo.findByPiso(mapaPisoDTO.piso);

      if (mapaPiso == null)
        return Result.fail<IMapaPisoDTO>("Não existe qualquer mapa piso com o piso " + mapaPisoDTO.piso);

      await this.mapaPisoRepo.delete(mapaPiso);

      return Result.ok<IMapaPisoDTO>(MapaPisoMap.toDTO(mapaPiso));
    } catch (err) {
      throw err;
    }
  }


  // Venâncio: Vou fazer uma listagem filtrada para o PROLOG, apenas com a info necessária.
  public async listMapasPiso(): Promise<Result<IMazeDTO[]>> {
    try {

      const mapasPiso = await this.mapaPisoRepo.findAll();

      if (mapasPiso == null) {
        return Result.fail<IMazeDTO[]>("Não existem registos de mapas de piso");
      }

      let mapaPisoDTO: IMazeDTO[] = [];

      for (const mapaPiso of mapasPiso) {

        let mapa: IMapaDTO = mapaPiso.mapa as unknown as IMapaDTO;

        const p = {
          piso: mapaPiso.piso.designacao,
          largura: mapa.maze.size.width,
          profundidade: mapa.maze.size.depth,
          mapa: mapa.maze.map,
          saidas: mapa.maze.exits,
          elevador: mapa.maze.elevators,
          salas: mapa.maze.rooms,
          saidaLocalizacao: mapa.maze.exitLocation
        } as IMazeDTO;

        mapaPisoDTO.push(p);
      }

      return Result.ok<IMazeDTO[]>(mapaPisoDTO)
    } catch (e) {
      throw e;
    }
  }

  public async caminhoEntrePisos(cep: ICaminhoEntrePisosDTO): Promise<Result<ISolucaoCaminhoDTO>> {

    let sol1: string[][];
    let sol2: number[][];

    if (cep.destino == cep.origem)
      return Result.fail<ISolucaoCaminhoDTO>("A origem e o destino devem ser diferentes.");

    const uri = config.planningConnectionString + "/path_between_floors?origem=" + cep.origem +
      "&destino=" + cep.destino;

    let a = new Promise((resolve) => {
      http.get(uri, res => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(data);
          const parsedData = JSON.parse(data);
          sol1 = JSON.parse(data).sol1;
          sol2 = JSON.parse(data).sol2;
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      }).end();
    });

    await a;

    return CaminhoEntrePisosSolucao.create({
      caminhoEntrePisos: sol1,
      caminhoPorPiso: sol2
    } as ISolucaoCaminhoDTO);

  }

  public async listMapaPiso(listMapaPisoDTO: IListMapaPisoDTO): Promise<Result<IMapaJsonDTO>> {
    try {

      const piso = await this.mapaPisoRepo.findByPiso(listMapaPisoDTO.piso);

      if (piso == null)
        return Result.fail<IMapaPisoDTO>("O piso com a designacao " + listMapaPisoDTO.piso + " não tem mapa piso.");

      // Query deve retornar todos os pisos que contenham este edificio.

      /*
      let pisosDTO: IPisoDTO[] = [];
      pisos.forEach(p => pisosDTO.push(PisoMap.toDTO(p)));
      */


      let mapaPisoDTO = MapaPisoMap.toDTO(piso);
      let mapaJsonDTO = mapaPisoDTO.mapa;


      return Result.ok<IMapaJsonDTO>(mapaJsonDTO as unknown as IMapaJsonDTO)
    } catch (e) {
      throw e;
    }
  }
}
