export class CreateCarritoItemDto {
    private constructor(
      public readonly usuarioId: number,
      public readonly productoId: number,
      public readonly cantidad: number,
    ) {}
  
    static create(props: {
      usuarioId: number;
      productoId: number;
      cantidad: number;
    }): [string?, CreateCarritoItemDto?] {
      const { usuarioId, productoId, cantidad } = props;
  
      if (isNaN(usuarioId) || isNaN(productoId) || isNaN(cantidad) || cantidad <= 0) {
        return ['Invalid input data', undefined];
      }
  
      return [undefined, new CreateCarritoItemDto(usuarioId, productoId, cantidad)];
    }
  }
  