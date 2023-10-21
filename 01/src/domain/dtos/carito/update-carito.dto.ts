import { Prisma } from "@prisma/client";

export class UpdateCarritoItemDto {
    constructor(public cantidad: number) {}
  
    static create(props: { cantidad: number }): UpdateCarritoItemDto | string {
      const { cantidad } = props;
  
      if (isNaN(cantidad) || cantidad <= 0) {
        return 'Invalid input data';
      }
  
      return new UpdateCarritoItemDto(cantidad);
    }
  
    toPrismaUpdateInput(): Prisma.CarritoUpdateInput {
      return {
        cantidad: this.cantidad,
      };
    }
  }
  