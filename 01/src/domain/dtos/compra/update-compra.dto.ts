export class UpdateCompraDto {
    private constructor(
      public readonly id: number,
      public readonly fechaCompra?: Date,
      public readonly usuarioId?: number,
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.fechaCompra) returnObj.fechaCompra = this.fechaCompra;
      if (this.usuarioId) returnObj.usuarioId = this.usuarioId;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateCompraDto?] {
      const { id, fechaCompra, usuarioId } = props;
  
      if (!id || isNaN(Number(id))) {
        return ['id must be a valid number'];
      }
  
      if (!fechaCompra && !usuarioId) {
        return ['At least one property must be provided'];
      }
  
      return [undefined, new UpdateCompraDto(id, fechaCompra, usuarioId)];
    }
  }
  