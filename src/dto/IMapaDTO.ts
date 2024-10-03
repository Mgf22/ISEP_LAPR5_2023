export default interface IMapaDTO {
    maze: {
      size: {
        width: number;
        height?: number;
        depth: number;
      };
      map: number[][];
      exits: number[][];
      elevators: number[][];
      rooms: number[][];
      exitLocation: number[];
    };
    ground: {
      size: {
        width: number;
        height?: number;
        depth: number;
      };
      segments: {
        width: number;
        height: number;
        depth: number;
      };
      primaryColor: string;
      maps: {
        color: {
          url: string;
        };
        ao: {
          url: string;
          intensity: number;
        };
        displacement: {
          url: string;
          scale: number;
          bias: number;
        };
        normal: {
          url: string;
          type: number;
          scale: {
            x: number;
            y: number;
          };
        };
        bump: {
          url: string;
          scale: number;
        };
        roughness: {
          url: string;
          rough: number;
        };
      };
      wrapS: number;
      wrapT: number;
      repeat: {
        u: number;
        v: number;
      };
      magFilter: number;
      minFilter: number;
      secondaryColor: string;
    };
    wall: {
      segments: {
        width: number;
        height: number;
        depth: number;
      };
      primaryColor: string;
      maps: {
        color: {
          url: string;
        };
        ao: {
          url: string;
          intensity: number;
        };
        displacement: {
          url: string;
          scale: number;
          bias: number;
        };
        normal: {
          url: string;
          type: number;
          scale: {
            x: number;
            y: number;
          };
        };
        bump: {
          url: string;
          scale: number;
        };
        roughness: {
          url: string;
          rough: number;
        };
      };
      wrapS: number;
      wrapT: number;
      repeat: {
        u: number;
        v: number;
      };
      magFilter: number;
      minFilter: number;
      secondaryColor: string;
    };
    player: {
      initialPosition: number[];
      initialDirection: number;
    };
  }
  