export class UpdateFacturaDto {
    private constructor(
      public readonly id: number,
      public readonly numero?: string,
      public readonly fecha?: Date,
      public readonly total?: number
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.numero) returnObj.numero = this.numero;
      if (this.fecha) returnObj.fecha = this.fecha;
      if (this.total !== undefined) returnObj.total = this.total;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateFacturaDto?] {
      const { id, numero, fecha, total } = props;
  
      if (!id || isNaN(Number(id))) {
        return ['id must be a valid number'];
      }
  
      if (numero === undefined && fecha === undefined && total === undefined) {
        return ['At least one property must be provided'];
      }
  
      return [undefined, new UpdateFacturaDto(id, numero, fecha, total)];
    }
  }