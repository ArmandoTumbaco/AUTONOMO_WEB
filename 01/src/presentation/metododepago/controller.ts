import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { UpdateMetodoDePagoDto } from '../../domain/dtos/metododepago/update-metododepago.dto';
import { CreateMetodoDePagoDto } from '../../domain/dtos/metododepago/create-metododepago.dto';
const prisma = new PrismaClient();

export class MetodoDePagosController {
    //* DI
    constructor() { }
    public getMetodoDePagos = async( req: Request, res: Response ) => {
      const metododepagos = await prisma.metodoDePago.findMany();
      return res.json( metododepagos);
    };
  
    public getMetodoDePagosById = async( req: Request, res: Response ) => {
      const id = +req.params.id;
      //    localhost:3000/metododepagos/1
      if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );
  
      const metododepago = await prisma.metodoDePago.findFirst({
        where: { id }
      });
      
      ( metododepago)
        ? res.json(metododepago)
        : res.status( 404 ).json( { error: `MetodoDePago with id ${ id } not found` } );
    };
  
  
  
    public createMetodoDePago = async (req: Request, res: Response) => {
        const result = CreateMetodoDePagoDto.create(req.body);
    
        if (result[0]) {
            // Si hay un error, devuelve una respuesta de error
            return res.status(400).json({ error: result[0] });
        }
    
        const createMetodoDePagoDto = result[1]!; // Aquí estamos seguros de que no es undefined
    
        const metodoDePago = await prisma.metodoDePago.create({
            data: {
                nombre: createMetodoDePagoDto.metodoPago
            }
        });
    
        res.json(metodoDePago);
    };
    
    
    
  
    public updateMetodoDePago = async( req: Request, res: Response ) => {
      const id = +req.params.id;
      const [error, updateMetodoDePagoDto] = UpdateMetodoDePagoDto.create({...req.body, id});
      if ( error ) return res.status(400).json({ error });
      
      const metododepago= await prisma.metodoDePago.findFirst({
        where: { id }
      });
      if ( !metododepago ) return res.status( 404 ).json( { error: `MetodoDePago with id ${ id } not found` } );
      const updatedMetodoDePago = await prisma.metodoDePago.update({
        where: { id },
        data: updateMetodoDePagoDto!.values
      });
      res.json( updatedMetodoDePago );
    }
  
  
    public deleteMetodoDePago = async(req:Request, res: Response) => {
      const id = +req.params.id;
      const metododepago= await prisma.metodoDePago.findFirst({
        where: { id }
      });
  
      if ( !metododepago ) return res.status(404).json({ error: `MetodoDePago with id ${ id } not found` });
      const deleted = await prisma.metodoDePago.delete({
        where: { id }
      });
      ( deleted ) 
        ? res.json( deleted )
        : res.status(400).json({ error: `MetodoDePago with id ${ id } not found` });
    }
  }
