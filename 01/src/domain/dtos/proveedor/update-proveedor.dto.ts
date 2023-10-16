export class UpdateProveedorDto {
    private constructor(
      public readonly id: number,
      public readonly nombre?: string
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.nombre) returnObj.nombre = this.nombre;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateProveedorDto?] {
      const { id, nombre } = props;
  
      if (!id || isNaN(Number(id)) || nombre === undefined) {
        return ['id must be a valid number, and nombre must be provided'];
      }
  
      return [undefined, new UpdateProveedorDto(id, nombre)];
    }
  }