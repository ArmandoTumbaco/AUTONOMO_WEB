export class UpdateProductoDto {
    private constructor(
      public readonly id: number,
      public readonly nombre?: string,
      public readonly precio?: number,
      public readonly categoriaId?: number,
      public readonly proveedorId?: number
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.nombre) returnObj.nombre = this.nombre;
      if (this.precio !== undefined) returnObj.precio = this.precio;
      if (this.categoriaId !== undefined) returnObj.categoriaId = this.categoriaId;
      if (this.proveedorId !== undefined) returnObj.proveedorId = this.proveedorId;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateProductoDto?] {
      const { id, nombre, precio, categoriaId, proveedorId } = props;
  
      if (!id || isNaN(Number(id)) || (nombre === undefined && precio === undefined && categoriaId === undefined && proveedorId === undefined)) {
        return ['id must be a valid number, and at least one property must be provided'];
      }
  
      return [undefined, new UpdateProductoDto(id, nombre, precio, categoriaId, proveedorId)];
    }
  }