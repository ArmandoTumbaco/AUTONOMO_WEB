import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { UpdateProductoDto } from '../../domain/dtos/producto/update-producto.dto';
import { CreateProductoDto } from '../../domain/dtos/producto/create-producto.dto';


const prisma = new PrismaClient();

export class ProductosController {
    public createProducto = async (req: Request, res: Response) => {
      const [error, createProductoDto] = CreateProductoDto.create(req.body);
      if (error) return res.status(400).json({ error });
  
      const producto = await prisma.producto.create({
        data: createProductoDto!,
      });
  
      res.json(producto);
    }
  
