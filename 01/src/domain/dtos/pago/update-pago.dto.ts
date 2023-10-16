export class UpdatePagoDto {
    private constructor(
      public readonly id: number,
      public readonly fecha?: Date,
      public readonly monto?: number,
      public readonly facturaId?: number,
      public readonly metodoDePagoId?: number
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.fecha) returnObj.fecha = this.fecha;
      if (this.monto !== undefined) returnObj.monto = this.monto;
      if (this.facturaId !== undefined) returnObj.facturaId = this.facturaId;
      if (this.metodoDePagoId !== undefined) returnObj.metodoDePagoId = this.metodoDePagoId;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdatePagoDto?] {
      const { id, fecha, monto, facturaId, metodoDePagoId } = props;
  
      if (!id || isNaN(Number(id))) {
        return ['id must be a valid number'];
      }
  
      if (fecha === undefined && monto === undefined && facturaId === undefined && metodoDePagoId === undefined) {
        return ['At least one property must be provided'];
      }
  
      return [undefined, new UpdatePagoDto(id, fecha, monto, facturaId, metodoDePagoId)];
    }
  }