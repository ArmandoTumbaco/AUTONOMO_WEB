import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateCarritoItemDto } from '../../domain/dtos/carito/create-carito.dto';
import { UpdateCarritoItemDto } from '../../domain/dtos/carito/update-carito.dto';

const prisma = new PrismaClient();
export class CarritoController {
  constructor() {}

  public getCarrito = async (req: Request, res: Response) => {

    const carritos = await prisma.carrito.findMany();
        return res.json(carritos);
  };

  public getCarritoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const carrito = await prisma.carrito.findFirst({
      where: { id },
    });

    if (carrito) {
      res.json(carrito);
    } else {
      res.status(404).json({ error: `Carrito with id ${id} not found` });
    }
  };
  
  public addProductoToCarrito = async (req: Request, res: Response) => {
    const usuarioId = +req.params.usuarioId;
    const [error, createCarritoItemDto] = CreateCarritoItemDto.create({
      usuarioId,
      productoId: req.body.productoId,
      cantidad: req.body.cantidad,
    });

    if (error) return res.status(400).json({ error });

    const carritoItem = await prisma.carrito.create({
      data: createCarritoItemDto!,
      include: { producto: true },
    });

    return res.json(carritoItem);
  };

  public updateCarritoItem = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const updateCarritoItemDto = UpdateCarritoItemDto.create(req.body);
  
    if (!updateCarritoItemDto) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
  
    const carritoItem = await prisma.carrito.findFirst({
      where: { id },
    });
  
    if (!carritoItem) return res.status(404).json({ error: `Carrito item with id ${id} not found` });
  
    const updatedCarritoItem = await prisma.carrito.update({
      where: { id },
      data: updateCarritoItemDto, // Aquí se usa directamente el objeto
      include: { producto: true },
    });
  
    res.json(updatedCarritoItem);
  };
  

  public removeCarritoItem = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const carritoItem = await prisma.carrito.findFirst({
      where: { id },
    });

    if (!carritoItem) return res.status(404).json({ error: `Carrito item with id ${id} not found` });

    const deleted = await prisma.carrito.delete({
      where: { id },
      include: { producto: true },
    });

    return deleted ? res.json(deleted) : res.status(400).json({ error: `Carrito item with id ${id} not found` });
  };
}