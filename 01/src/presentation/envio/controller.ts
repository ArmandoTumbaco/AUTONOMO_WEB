import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateEnvioDto } from '../../domain/dtos/envio/create-envio.dto';
import { UpdateEnvioDto } from '../../domain/dtos/envio/update-envio.dto';

const prisma = new PrismaClient();

export class EnvioController {
  constructor() {}

  public getEnvios = async (req: Request, res: Response) => {
    const envios = await prisma.envio.findMany();
    return res.json(envios);
  };

  public getEnvioById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const envio = await prisma.envio.findFirst({
      where: { id },
    });

    return envio
      ? res.json(envio)
      : res.status(404).json({ error: `Envio with id ${id} not found` });
  };

  public createEnvio = async (req: Request, res: Response) => {
    const createEnvioDto = CreateEnvioDto.create(req.body);
  
    if (createEnvioDto[0]) {
      return res.status(400).json({ error: createEnvioDto[0] });
    }
  
    const { direccion, ciudad, estado, codigoPostal, productoId  } = createEnvioDto[1]!;
    
    try {
      const envio = await prisma.envio.create({
        data: {
          direccion,
          ciudad,
          estado,
          codigoPostal,
          producto: { connect: { id: productoId } },
        } as Prisma.EnvioCreateInput,
      });
    
      res.json(envio);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating Envio' });
    }
  };
  
  

  public updateEnvio = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const updateEnvioDto = UpdateEnvioDto.create(req.body);
  
    const envio = await prisma.envio.findFirst({
      where: { id },
    });
  
    if (!envio) return res.status(404).json({ error: `Envio with id ${id} not found` });
  
    const updatedEnvio = await prisma.envio.update({
      where: { id },
      data: updateEnvioDto,
    });
  
    res.json(updatedEnvio);
  };
  

  public deleteEnvio = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const envio = await prisma.envio.findFirst({
      where: { id },
    });

    if (!envio) return res.status(404).json({ error: `Envio with id ${id} not found` });

    const deleted = await prisma.envio.delete({
      where: { id },
    });

    return deleted ? res.json(deleted) : res.status(400).json({ error: `Envio with id ${id} not found` });
  };
}
