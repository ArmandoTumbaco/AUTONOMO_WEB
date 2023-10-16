import { CreateHistorialCompraDto } from "../historialcompra/create-historialcompra.dto";

export class CreateCompraDto {
    private constructor(
      public readonly fechaCompra: Date,
      public readonly usuarioId: number,
      public readonly historialCompra: CreateHistorialCompraDto[]
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreateCompraDto?] {
      const { fechaCompra, usuarioId, historialCompra } = props;
  
      if (!fechaCompra || !usuarioId) {
        return ['FechaCompra and UsuarioId properties are required', undefined];
      }
  
      return [undefined, new CreateCompraDto(fechaCompra, usuarioId, historialCompra)];
    }
  }
