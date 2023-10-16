export class CreateHistorialCompraDto {
    private constructor(
      public readonly cantidad: number,
      public readonly producto: string,
      public readonly compraId: number
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreateHistorialCompraDto?] {
      const { cantidad, producto, compraId } = props;
  
      if (!cantidad || !producto || !compraId) {
        return ['Cantidad, Producto, and CompraId properties are required', undefined];
      }
  
      return [undefined, new CreateHistorialCompraDto(cantidad, producto, compraId)];
    }
  }