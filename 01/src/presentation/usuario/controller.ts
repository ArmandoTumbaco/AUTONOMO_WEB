import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UpdateUsuarioDto } from '../../domain/dtos/usuario/update-usuario.dto';
import { CreateUsuarioDto } from '../../domain/dtos/usuario/create-usuario.dto';

const prisma = new PrismaClient();
export class UsuariosController {
    //* DI
    constructor() { }
  
    public getUsuarios = async (req: Request, res: Response) => {
      const usuarios = await prisma.usuario.findMany(); 
      return res.json(usuarios);
    };
  
    public getUsuarioById = async (req: Request, res: Response) => {
      const id = +req.params.id;
      // localhost:3000/usuarios/1
      if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });
  
      const usuario = await prisma.usuario.findFirst({
        where: { id }
      });
  
      usuario
        ? res.json(usuario)
        : res.status(404).json({ error: `Usuario with id ${id} not found` }); 
    };
  
    public createUsuario = async (req: Request, res: Response) => {
      const [error, createUsuarioDto] = CreateUsuarioDto.create(req.body); "CreateUsuarioDto"
      if (error) return res.status(400).json({ error });
  
      const usuario = await prisma.usuario.create({
        data: createUsuarioDto!
      });
  
      res.json(usuario); 
    };
  
    public updateUsuario = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const [error, updateUsuarioDto] = UpdateUsuarioDto.create({ ...req.body, id });
      if (error) return res.status(400).json({ error });
  
      const usuario = await prisma.usuario.findFirst({
        where: { id }
      });
      if (!usuario) return res.status(404).json({ error: `Usuario with id ${id} not found` });
  
      const updatedUsuario = await prisma.usuario.update({
        where: { id },
        data: updateUsuarioDto!.values
      });
  
      res.json(updatedUsuario); 
    }
  
    public deleteUsuario = async (req: Request, res: Response) => {
      const id = +req.params.id;
      const usuario = await prisma.usuario.findFirst({
        where: { id }
      });
  
      if (!usuario) return res.status(404).json({ error: `Usuario with id ${id} not found` });
  
      const deleted = await prisma.usuario.delete({
        where: { id }
      });
  
      deleted
        ? res.json(deleted)
        : res.status(400).json({ error: `Usuario with id ${id} not found` });
    }
  }
