import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateProveedorDto } from '../../domain/dtos/proveedor/create-proveedor.dto';
import { UpdateProveedorDto } from '../../domain/dtos/proveedor/update-proveedor.dto';
const prisma = new PrismaClient();

export class ProveedoresController {

    constructor() {}

    public getProveedores = async (req: Request, res: Response) => {
        const proveedores = await prisma.proveedor.findMany();
        return res.json(proveedores);
    };

    public getProveedorById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });
  
        const proveedor = await prisma.proveedor.findUnique({
          where: { id },
        });
  
        if (proveedor) {
          res.json(proveedor);
        } else {
          res.status(404).json({ error: `Proveedor with id ${id} not found` });
        }
      };

    public createProveedor = async (req: Request, res: Response) => {
      const [error, createProveedorDto] = CreateProveedorDto.create(req.body);
      if (error) return res.status(400).json({ error });
  
      const proveedor = await prisma.proveedor.create({
        data: createProveedorDto!,
      });
  
      res.json(proveedor);
    }
  
    public updateProveedor = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const [error, updateProveedorDto] = UpdateProveedorDto.create({ ...req.body, id });
      if (error) return res.status(400).json({ error });
  
      const proveedor = await prisma.proveedor.findUnique({
        where: { id },
      });
      if (!proveedor) return res.status(404).json({ error: `Proveedor with id ${id} not found` });
  
      const updatedProveedor = await prisma.proveedor.update({
        where: { id },
        data: updateProveedorDto!.values,
      });
      res.json(updatedProveedor);
    }
  
    public deleteProveedor = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const proveedor = await prisma.proveedor.findUnique({
        where: { id },
      });
  
      if (!proveedor) return res.status(404).json({ error: `Proveedor with id ${id} not found` });
  
      await prisma.proveedor.delete({
        where: { id },
      });
  
      res.status(400).send();
    }
  }
