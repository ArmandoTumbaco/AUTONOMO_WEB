import { CreatePagoDto } from "../pago/create-pago.dto";

export class CreateFacturaDto {
    private constructor(
      public readonly numero: string,
      public readonly fecha: Date,
      public readonly total: number,
      public readonly pagos: CreatePagoDto[]
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreateFacturaDto?] {
      const { numero, fecha, total, pagos } = props;
  
      if (!numero || !fecha || total === undefined) {
        return ['Numero, Fecha, and Total properties are required', undefined];
      }
  
      return [undefined, new CreateFacturaDto(numero, fecha, total, pagos)];
    }
  }