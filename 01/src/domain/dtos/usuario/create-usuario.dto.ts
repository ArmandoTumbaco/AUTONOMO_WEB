import { CreateCompraDto } from "../compra/create-compra.dto";

export class CreateUsuarioDto {
    private constructor(
      public readonly nombre: string,
      public readonly email: string,
      public readonly compra: CreateCompraDto[]
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreateUsuarioDto?] {
      const { nombre, email, compras } = props;
  
      if (!nombre || !email) {
        return ['Nombre and Email properties are required', undefined];
      }
  
      return [undefined, new CreateUsuarioDto(nombre, email, compras)];
    }
  }
