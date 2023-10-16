export class CreateProveedorDto {
    private constructor(
      public readonly nombre: string
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreateProveedorDto?] {
      const { nombre } = props;
  
      if (!nombre) {
        return ['Nombre property is required', undefined];
      }
  
      return [undefined, new CreateProveedorDto(nombre)];
    }
  }