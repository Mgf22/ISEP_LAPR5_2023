export default interface IMapaPisoFinal {
    piso: string;
    size: {
        width: number;
        height: number;
    };

    map: number[][];
    exits: string [][];
    elevators: number[][];
    rooms: number[][];
    exitLocation: number[];

    groundTextureUrl: string;
    wallTextureUrl: string;

    initialPosition: number[];
    initialDirection: number;
}
