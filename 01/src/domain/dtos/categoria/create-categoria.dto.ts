export class CreateCategoriaDto {
    private constructor(
      public readonly nombre: string
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreateCategoriaDto?] {
      const { nombre } = props;
  
      if (!nombre) {
        return ['Nombre property is required', undefined];
      }
  
      return [undefined, new CreateCategoriaDto(nombre)];
    }
  }
  