export class CreateEnvioDto {
    private constructor(
      public readonly direccion: string,
      public readonly ciudad: string,
      public readonly estado: string,
      public readonly codigoPostal: string,
    ) {}
  
    static create(props: {
      direccion: string;
      ciudad: string;
      estado: string;
      codigoPostal: string;
    }): [string?, CreateEnvioDto?] {
      const { direccion, ciudad, estado, codigoPostal } = props;
  
      if (!direccion || !ciudad || !estado || !codigoPostal) {
        return ['All fields are required', undefined];
      }
  
      return [undefined, new CreateEnvioDto(direccion, ciudad, estado, codigoPostal)];
    }
  }
  