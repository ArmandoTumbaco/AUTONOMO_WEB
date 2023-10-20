import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UpdateHistorialCompraDto } from '../../domain/dtos/historialcompra/update-historialcompra.dto';
import { CreateHistorialCompraDto } from '../../domain/dtos/historialcompra/create-historialcompra.dto';

const prisma = new PrismaClient();
export class HistorialCompraController {
    constructor() { }
  
    public getHistorialCompra = async (req: Request, res: Response) => {
      const historialCompras = await prisma.historialCompra.findMany();
      return res.json(historialCompras);
    };
  
    public getHistorialCompraById = async (req: Request, res: Response) => {
      const id = +req.params.id;
      if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });
  
      const historialCompra = await prisma.historialCompra.findFirst({
        where: { id }
      });
  
      historialCompra
        ? res.json(historialCompra)
        : res.status(404).json({ error: `HistorialCompra with id ${id} not found` });
    };
  
    public createHistorialCompra = async (req: Request, res: Response) => {
      const [error, createHistorialCompraDto] = CreateHistorialCompraDto.create(req.body);
      if (error) return res.status(400).json({ error });
  
      const historialCompra = await prisma.historialCompra.create({
        data: createHistorialCompraDto!
      });
  
      res.json(historialCompra);
    };
  
    public updateHistorialCompra = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const [error, updateHistorialCompraDto] = UpdateHistorialCompraDto.create({ ...req.body, id });
      if (error) return res.status(400).json({ error });
  
      const historialCompra = await prisma.historialCompra.findFirst({
        where: { id }
      });
      if (!historialCompra) return res.status(404).json({ error: `HistorialCompra with id ${id} not found` });
  
      const updatedHistorialCompra = await prisma.historialCompra.update({
        where: { id },
        data: updateHistorialCompraDto!.values
      });
  
      res.json(updatedHistorialCompra);
    }
  
    public deleteHistorialCompra = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const historialCompra = await prisma.historialCompra.findFirst({
        where: { id }
      });
  
      if (!historialCompra) return res.status(404).json({ error: `HistorialCompra with id ${id} not found` });
  
      const deleted = await prisma.historialCompra.delete({
        where: { id }
      });
  
      deleted
        ? res.json(deleted)
        : res.status(400).json({ error: `HistorialCompra with id ${id} not found` });
    }
  }
