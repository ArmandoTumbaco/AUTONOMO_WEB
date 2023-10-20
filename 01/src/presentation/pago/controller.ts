import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { UpdatePagoDto } from '../../domain/dtos/pago/update-pago.dto';
import { CreatePagoDto } from '../../domain/dtos/pago/create-pago.dto';
const prisma = new PrismaClient();
export class PagosController {
    //* DI
    constructor() { }
    public getPagos = async( req: Request, res: Response ) => {
      const pagos = await prisma.pago.findMany();
      return res.json( pagos);
    };
  
  
  
  
    public getPagoById = async( req: Request, res: Response ) => {
      const id = +req.params.id;
      //    localhost:3000/pagos/1
      if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );
  
      const pago = await prisma.pago.findFirst({
        where: { id }
      });
      
      ( pago)
        ? res.json(pago)
        : res.status( 404 ).json( { error: `Pago with id ${ id } not found` } );
    };
  
  
  
  
    public createPago = async( req: Request, res: Response ) => {
      
      const [error, createPagoDto] = CreatePagoDto.create(req.body);
      if ( error ) return res.status(400).json({ error });
  
      const pago= await prisma.pago.create({
        data: createPagoDto!
      });
  
      res.json( pago);
  
    };
  
  
  
    public updatePago = async( req: Request, res: Response ) => {
      const id = +req.params.id;
      const [error, updatePagoDto] = UpdatePagoDto.create({...req.body, id});
      if ( error ) return res.status(400).json({ error });
      
      const pago= await prisma.pago.findFirst({
        where: { id }
      });
      if ( !pago ) return res.status( 404 ).json( { error: `Pago with id ${ id } not found` } );
      const updatedPago = await prisma.pago.update({
        where: { id },
        data: updatePagoDto!.values
      });
      res.json( updatedPago );
    }
  
  
    public deletePago = async(req:Request, res: Response) => {
      const id = +req.params.id;
      const pago= await prisma.pago.findFirst({
        where: { id }
      });
  
      if ( !pago ) return res.status(404).json({ error: `Pago with id ${ id } not found` });
      const deleted = await prisma.pago.delete({
        where: { id }
      });
      ( deleted ) 
        ? res.json( deleted )
        : res.status(400).json({ error: `Pago with id ${ id } not found` });
    }
  }
