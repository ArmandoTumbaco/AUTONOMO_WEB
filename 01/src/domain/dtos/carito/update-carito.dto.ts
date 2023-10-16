export class UpdateCarritoItemDto {
    private constructor(public readonly cantidad: number) {}
  
    static create(props: { cantidad: number }): UpdateCarritoItemDto | undefined {
      const { cantidad } = props;
  
      if (isNaN(cantidad) || cantidad <= 0) {
        return undefined; // No se puede crear un DTO inválido
      }
  
      return new UpdateCarritoItemDto(cantidad);
    }
  }
  