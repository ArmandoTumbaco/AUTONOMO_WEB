import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateCategoriaDto } from '../../domain/dtos/categoria/create-categoria.dto';
import { UpdateCategoriaDto } from '../../domain/dtos/categoria/update-categoria.dto';
const prisma = new PrismaClient();



export class CategoriasController {
    public createCategoria = async (req: Request, res: Response) => {
      const [error, createCategoriaDto] = CreateCategoriaDto.create(req.body);
      if (error) return res.status(400).json({ error });
  
      const categoria = await prisma.categoria.create({
        data: createCategoriaDto!,
      });
  
      res.json(categoria);
    }
  
    public updateCategoria = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const [error, updateCategoriaDto] = UpdateCategoriaDto.create({ ...req.body, id });
      if (error) return res.status(400).json({ error });
  
      const categoria = await prisma.categoria.findUnique({
        where: { id },
      });
      if (!categoria) return res.status(404).json({ error: `Categoría with id ${id} not found` });
  
      const updatedCategoria = await prisma.categoria.update({
        where: { id },
        data: updateCategoriaDto!.values,
      });
      res.json(updatedCategoria);
    }
  
    public deleteCategoria = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const categoria = await prisma.categoria.findUnique({
        where: { id },
      });
  
      if (!categoria) return res.status(404).json({ error: `Categoría with id ${id} not found` });
  
      await prisma.categoria.delete({
        where: { id },
      });
  
      res.status(400).send();
    }
  }
