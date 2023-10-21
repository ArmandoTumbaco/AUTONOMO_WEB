import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UpdateOpinionClienteDto } from '../../domain/dtos/opinion/update-opinion.dto';
import { CreateOpinionClienteDto } from '../../domain/dtos/opinion/create-opinion.dto';
const prisma = new PrismaClient();

export class OpinionClienteController {
  constructor() {}

  public getOpinionCliente = async( req: Request, res: Response ) => {
    const opinionClientes = await prisma.opinionCliente.findMany();
    return res.json( opinionClientes);
  };

  public createOpinionCliente = async (req: Request, res: Response) => {
    const createOpinionClienteDto = CreateOpinionClienteDto.create(req.body);

    if (createOpinionClienteDto[0]) {
      return res.status(400).json({ error: createOpinionClienteDto[0] });
    }

    const { calificacion, comentario, productoId, usuarioId } = createOpinionClienteDto[1]!;

    try {
      const opinionCliente = await prisma.opinionCliente.create({
        data: {
          calificacion,
          comentario,
          productoId,
          usuarioId,
        },
      });

      res.json(opinionCliente);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating OpinionCliente' });
    }
  };

  public getOpinionClienteById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const opinionCliente = await prisma.opinionCliente.findFirst({
      where: { id },
    });

    return opinionCliente
      ? res.json(opinionCliente)
      : res.status(404).json({ error: `OpinionCliente with id ${id} not found` });
  };

  public updateOpinionCliente = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const updateOpinionClienteDto = UpdateOpinionClienteDto.create(req.body);

    if (!updateOpinionClienteDto) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const opinionCliente = await prisma.opinionCliente.findFirst({
      where: { id },
    });

    if (!opinionCliente) return res.status(404).json({ error: `OpinionCliente with id ${id} not found` });

    const updatedOpinionCliente = await prisma.opinionCliente.update({
      where: { id },
      data: updateOpinionClienteDto, // Aquí se usa directamente el objeto
    });

    res.json(updatedOpinionCliente);
  };

  public deleteOpinionCliente = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const opinionCliente = await prisma.opinionCliente.findFirst({
      where: { id },
    });

    if (!opinionCliente) return res.status(404).json({ error: `OpinionCliente with id ${id} not found` });

    const deleted = await prisma.opinionCliente.delete({
      where: { id },
    });

    return deleted ? res.json(deleted) : res.status(400).json({ error: `OpinionCliente with id ${id} not found` });
  };
}
