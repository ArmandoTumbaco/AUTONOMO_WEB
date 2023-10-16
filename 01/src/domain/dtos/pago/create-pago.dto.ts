export class CreatePagoDto {
    private constructor(
      public readonly fecha: Date,
      public readonly monto: number,
      public readonly facturaId: number,
      public readonly metodoDePagoId: number
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreatePagoDto?] {
      const { fecha, monto, facturaId, metodoDePagoId } = props;
  
      if (!fecha || monto === undefined || !facturaId || !metodoDePagoId) {
        return ['Fecha, Monto, FacturaId, and MetodoDePagoId properties are required', undefined];
      }
  
      return [undefined, new CreatePagoDto(fecha, monto, facturaId, metodoDePagoId)];
    }
  }