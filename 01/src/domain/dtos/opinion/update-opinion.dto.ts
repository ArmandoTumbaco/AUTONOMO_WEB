export class UpdateOpinionClienteDto {
    private constructor(
      public readonly calificacion: number | undefined,
      public readonly comentario: string | null | undefined,
      public readonly productoId: number | undefined,
      public readonly usuarioId: number | undefined
    ) {}
  
    static create(props: {
      calificacion?: number;
      comentario?: string | null;
      productoId?: number;
      usuarioId?: number;
    }): UpdateOpinionClienteDto {
      const { calificacion, comentario, productoId, usuarioId } = props;
  
      return new UpdateOpinionClienteDto(calificacion, comentario, productoId, usuarioId);
    }
  }
  