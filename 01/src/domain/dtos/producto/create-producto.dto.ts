export class CreateProductoDto {
    private constructor(
      public readonly nombre: string,
      public readonly precio: number,
      public readonly categoriaId: number,
      public readonly proveedorId: number
    ) {}
  
    static create(props: { [key: string]: any }): [string?, CreateProductoDto?] {
      const { nombre, precio, categoriaId, proveedorId } = props;
  
      if (!nombre || precio === undefined || !categoriaId || !proveedorId) {
        return ['Nombre, Precio, CategoriaId, and ProveedorId properties are required', undefined];
      }
  
      return [undefined, new CreateProductoDto(nombre, precio, categoriaId, proveedorId)];
    }
  }