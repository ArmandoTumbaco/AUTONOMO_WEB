export class UpdateUsuarioDto {
    private constructor(
      public readonly id: number,
      public readonly email?: string,
      public readonly nombre?: string,
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
  
      if (this.email) returnObj.email = this.email;
      if (this.nombre) returnObj.nombre = this.nombre;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateUsuarioDto?] {
      const { id, nombre, email } = props;
  
      if (!id || isNaN(Number(id))) {
        return ['id must be a valid number'];
      }
  
      if (!email && !nombre) {
        return ['At least one property must be provided'];
      }
  
      return [undefined, new UpdateUsuarioDto(id, email, nombre)];
    }
  }