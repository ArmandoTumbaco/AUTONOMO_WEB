export class CreateEnvioDto {
    private constructor(
      public readonly direccion: string,
      public readonly ciudad: string,
      public readonly estado: string,
      public readonly codigoPostal: string,
      public readonly productoId: number
    ) {}
  
    static create(props: {
      direccion: string;
      ciudad: string;
      estado: string;
      codigoPostal: string;
      productoId: number; 
    }): [string?, CreateEnvioDto?] {
      const { direccion, ciudad, estado, codigoPostal, productoId } = props;
  
      if (!direccion || !ciudad || !estado || !codigoPostal || isNaN(productoId)) {
        return ['All fields are required', undefined];
      }
  
      return [undefined, new CreateEnvioDto(direccion, ciudad, estado, codigoPostal, productoId)];
    }
  }
  