export class UpdateMetodoDePagoDto {
    private constructor(
      public readonly id: number,
      public readonly metodoPago?: string
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.metodoPago) returnObj.metodoPago = this.metodoPago;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateMetodoDePagoDto?] {
      const { id, metodoPago } = props;
  
      if (!id || isNaN(Number(id)) || metodoPago === undefined) {
        return ['id must be a valid number, and nombre must be provided'];
      }
  
      return [undefined, new UpdateMetodoDePagoDto(id, metodoPago)];
    }
  }