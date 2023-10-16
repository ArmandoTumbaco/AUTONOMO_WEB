export class UpdateEnvioDto {
    private constructor(
      public readonly direccion?: string,
      public readonly ciudad?: string,
      public readonly estado?: string,
      public readonly codigoPostal?: string,
    ) {}
  
    static create(props: {
      direccion?: string;
      ciudad?: string;
      estado?: string;
      codigoPostal?: string;
    }): UpdateEnvioDto {
      const { direccion, ciudad, estado, codigoPostal } = props;
  
      return new UpdateEnvioDto(direccion, ciudad, estado, codigoPostal);
    }
  }
  