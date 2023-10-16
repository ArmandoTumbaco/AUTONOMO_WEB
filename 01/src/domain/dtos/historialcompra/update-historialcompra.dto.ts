export class UpdateHistorialCompraDto {
    private constructor(
      public readonly id: number,
      public readonly cantidad?: number,
      public readonly producto?: string,
      public readonly compraId?: number,
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.cantidad !== undefined) returnObj.cantidad = this.cantidad;
      if (this.producto) returnObj.producto = this.producto;
      if (this.compraId !== undefined) returnObj.compraId = this.compraId;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateHistorialCompraDto?] {
      const { id, cantidad, producto, compraId } = props;
  
      if (!id || isNaN(Number(id)) || (cantidad === undefined && compraId === undefined)) {
        return ['id must be a valid number, and at least one of cantidad or compraId must be provided'];
      }
  
      return [undefined, new UpdateHistorialCompraDto(id, cantidad, producto, compraId)];
    }
  }