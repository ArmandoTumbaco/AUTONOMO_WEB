export class UpdateCategoriaDto {
    private constructor(
      public readonly id: number,
      public readonly nombre?: string
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.nombre) returnObj.nombre = this.nombre;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateCategoriaDto?] {
      const { id, nombre } = props;
  
      if (!id || isNaN(Number(id)) || nombre === undefined) {
        return ['id must be a valid number, and nombre must be provided'];
      }
  
      return [undefined, new UpdateCategoriaDto(id, nombre)];
    }
  }