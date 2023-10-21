import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateCarritoItemDto } from '../../domain/dtos/carito/create-carito.dto';
import { UpdateCarritoItemDto } from '../../domain/dtos/carito/update-carito.dto';

const prisma = new PrismaClient();

export class CarritoController {
  constructor() {}


  public getCarrito = async (req: Request, res: Response) => {
   
    const carritos = await prisma.carrito.findMany();
    return res.json(carritos);
  };

  public createCarritoItem = async (req: Request, res: Response) => {
    const createCarritoItemDto = CreateCarritoItemDto.create(req.body);

    if (typeof createCarritoItemDto === 'string') {
      return res.status(400).json({ error: createCarritoItemDto });
    }

    const carritoItem = await prisma.carrito.create({
      data: createCarritoItemDto,
      include: { producto: true },
    });

    return res.json(carritoItem);
  };

  public getCarritoItemById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const carritoItem = await prisma.carrito.findFirst({
      where: { id },
    });

    if (carritoItem) {
      res.json(carritoItem);
    } else {
      res.status(404).json({ error: `Carrito item with id ${id} not found` });
    }
  };

  public updateCarritoItem = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const updateCarritoItemDto = UpdateCarritoItemDto.create(req.body);
  
    if (typeof updateCarritoItemDto === 'string') {
      return res.status(400).json({ error: updateCarritoItemDto });
    }
  
    const carritoItem = await prisma.carrito.findFirst({
      where: { id },
    });
  
    if (!carritoItem) return res.status(404).json({ error: `Carrito item with id ${id} not found` });
  
    const updatedCarritoItem = await prisma.carrito.update({
      where: { id },
      data: updateCarritoItemDto.toPrismaUpdateInput(),
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