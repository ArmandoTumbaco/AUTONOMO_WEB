import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { UpdateProductoDto } from '../../domain/dtos/producto/update-producto.dto';
import { CreateProductoDto } from '../../domain/dtos/producto/create-producto.dto';


const prisma = new PrismaClient();


export class ProductosController {
    constructor() {}

  public getProductos = async (req: Request, res: Response) => {
    const productos = await prisma.producto.findMany();
    return res.json(productos);
  };

  public getProductoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const producto = await prisma.producto.findFirst({
      where: { id },
    });

    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: `Producto with id ${id} not found` });
    }
  };
  
    public createProducto = async (req: Request, res: Response) => {
      const [error, createProductoDto] = CreateProductoDto.create(req.body);
      if (error) return res.status(400).json({ error });
  
      const producto = await prisma.producto.create({
        data: createProductoDto!,
      });
  
      res.json(producto);
    }
  
    public updateProducto = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const [error, updateProductoDto] = UpdateProductoDto.create({ ...req.body, id });
      if (error) return res.status(400).json({ error });
  
      const producto = await prisma.producto.findUnique({
        where: { id },
      });
      if (!producto) return res.status(404).json({ error: `Producto with id ${id} not found` });
  
      const updatedProducto = await prisma.producto.update({
        where: { id },
        data: updateProductoDto!.values,
      });
      res.json(updatedProducto);
    }
  
    public deleteProducto = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const producto = await prisma.producto.findUnique({
        where: { id },
      });
  
      if (!producto) return res.status(404).json({ error: `Producto with id ${id} not found` });
  
      await prisma.producto.delete({
        where: { id },
      });
  
      res.status(400).send();
    }
  }
