export class CreateOpinionClienteDto {
    private constructor(
      public readonly calificacion: number,
      public readonly comentario: string | null,
      public readonly productoId: number,
      public readonly usuarioId: number
    ) {}
  
    static create(props: {
      calificacion: number;
      comentario: string | null;
      productoId: number;
      usuarioId: number;
    }): [string?, CreateOpinionClienteDto?] {
      const { calificacion, comentario, productoId, usuarioId } = props;
  
      if (isNaN(calificacion) || calificacion < 1 || calificacion > 5) {
        return ['Invalid calificacion (should be a number between 1 and 5)', undefined];
      }
  
      if (!comentario) {
        return ['Invalid comentario', undefined];
      }
  
      if (isNaN(productoId) || isNaN(usuarioId)) {
        return ['Invalid product or user ID', undefined];
      }
  
      return [undefined, new CreateOpinionClienteDto(calificacion, comentario, productoId, usuarioId)];
    }
  }
  