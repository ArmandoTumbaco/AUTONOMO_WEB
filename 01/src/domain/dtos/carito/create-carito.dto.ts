export class CreateCarritoItemDto {
    constructor(
      public readonly usuarioId: number,
      public readonly productoId: number,
      public readonly cantidad: number
    ) {}
  
    static create(props: {
      usuarioId: number;
      productoId: number;
      cantidad: number;
    }): CreateCarritoItemDto | string {
      const { usuarioId, productoId, cantidad } = props;
  
      if (isNaN(usuarioId) || isNaN(productoId) || isNaN(cantidad) || cantidad <= 0) {
        return 'Invalid input data';
      }
  
      return new CreateCarritoItemDto(usuarioId, productoId, cantidad);
    }
  }
  