import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoboDTO from '../dto/IRoboDTO';
import { Robo } from "../domain/robo";
import IRoboService from './IServices/IRoboService';
import { Result } from "../core/logic/Result";
import { RoboMap } from "../mappers/RoboMap";
import { EstadoRobo } from '../domain/estadoRobo';
import { create } from 'lodash';
import { NumeroSerieRobo } from '../domain/numeroSerieRobo';
import { MarcaRobo } from '../domain/marcaRobo';
import { CodigoRobo } from '../domain/codigoRobo';
import { TipoRobo } from '../domain/tipoRobo';
import ITipoRoboRepo from './IRepos/ITipoRoboRepo';
import IRoboRepo from './IRepos/IRoboRepo';
import IEnableRoboDTO from '../dto/IEnableRoboDTO';
import IDeleteRoboDTO from '../dto/IDeleteRoboDTO';

@Service()
export default class RoboService implements IRoboService {
  constructor(
    @Inject(config.repos.robo.name) private roboRepo: IRoboRepo,
    @Inject(config.repos.tipoRobo.name) private tipoRoboRepo: ITipoRoboRepo
  ) { }

  public async createRobo(roboDTO: IRoboDTO): Promise<Result<IRoboDTO>> {
    try {

      const roboDocument = await this.roboRepo.findByCodigo(roboDTO.codigo);

      if (roboDocument != null)
        return Result.fail<IRoboDTO>("Já existe um robo com o código " + roboDTO.codigo);

      const estado = Object.keys(EstadoRobo).find(key => EstadoRobo[key] === roboDTO.estado);
      const tipo = await this.tipoRoboRepo.findByDesignacao(roboDTO.tipoRobo);
      
      if(tipo == null)
        return Result.fail<IRoboDTO>("Não existe tipo de robo com esse código " + roboDTO.tipoRobo);
      const roboOrError = Robo.create({
        estado: "Inibido",
        marca: MarcaRobo.create(roboDTO.marca).getValue(),
        codigo: CodigoRobo.create(roboDTO.codigo).getValue(),
        numeroSerie: NumeroSerieRobo.create(roboDTO.numeroSerie).getValue(),
        nickname: roboDTO.nickname,
        tipoRobo: tipo
      })

      if (roboOrError.isFailure) {
        return Result.fail<IRoboDTO>(roboOrError.errorValue());
      }

      const roboResult = roboOrError.getValue();
      await this.roboRepo.save(roboResult);

      const roboDTOResult = RoboMap.toDTO(roboResult) as IRoboDTO;
      return Result.ok<IRoboDTO>(roboDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async listRobos(): Promise<Result<IRoboDTO[]>> {
    try {

      const robos = await this.roboRepo.findAll();

      if (robos == null) {
        return Result.fail<IRoboDTO[]>("Não existem registos de robos");
      }

      let robosDTO: IRoboDTO[] = [];

      robos.forEach(p => robosDTO.push(RoboMap.toDTO(p) as IRoboDTO));

      return Result.ok<IRoboDTO[]>(robosDTO)
    } catch (e) {
      throw e;
    }
  }

  // joao: isto também estava em falta, falta depois atualizar

  public async updateRobo(roboDTO: IRoboDTO): Promise<Result<IRoboDTO>> {
    return null;

  }

  public async inhibitRobo(enableRoboDTO: IEnableRoboDTO): Promise<Result<IRoboDTO>> {
    try {
      const robo = await this.roboRepo.findByCodigo(enableRoboDTO.codigo);

      if (robo === null) {
        return Result.fail<IRoboDTO>("Robo não encontrado");
      }
        robo.inibir();
        await this.roboRepo.save(robo);

        const roboDTOResult = RoboMap.toDTO(robo) as IRoboDTO;
        return Result.ok<IRoboDTO>(roboDTOResult)
      
    } catch (e) {
      throw e;
    }
  }

  public async deleteRobo(roboDTO: IDeleteRoboDTO): Promise<Result<IRoboDTO>> {
    try {
      const robo = await this.roboRepo.findByCodigo(roboDTO.codigo);

      if (robo == null)
        return Result.fail<IRoboDTO>("Não existe qualquer robo com o codigo " + roboDTO.codigo);

      await this.roboRepo.delete(robo);

      return Result.ok<IRoboDTO>(RoboMap.toDTO(robo));
    } catch (err) {
      throw err;
    }
  }
}
