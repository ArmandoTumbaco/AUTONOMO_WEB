import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import { UpdateFacturaDto } from '../../domain/dtos/factura/update-factura.dto';
import { CreateFacturaDto } from '../../domain/dtos/factura/create-factura.dto';
const prisma = new PrismaClient();
export class FacturasController {
    //* DI
    constructor() { }
    public getFacturas = async( req: Request, res: Response ) => {
      const facturas = await prisma.factura.findMany();
      return res.json( facturas);
    };
  
  
  
  
    public getFacturaById = async( req: Request, res: Response ) => {
      const id = +req.params.id;
      //    localhost:3000/facturas/1
      if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );
  
      const factura = await prisma.factura.findFirst({
        where: { id }
      });
      
      ( factura)
        ? res.json( factura)
        : res.status( 404 ).json( { error: `Factura with id ${ id } not found` } );
    };
  
  
  
  
    public createFactura = async (req: Request, res: Response) => {
        const result = CreateFacturaDto.create(req.body);
    
        if (result[0]) {
            // Si hay un error, devuelve una respuesta de error
            return res.status(400).json({ error: result[0] });
        }
    
        const createFacturaDto = result[1]!; // Aquí estamos seguros de que no es undefined
    
        // Mapea la propiedad "pagos" al formato requerido por Prisma
        const pagos = createFacturaDto.pagos.map((pago) => {
            return {
                fecha: pago.fecha,
                monto: pago.monto,
                metodoDePago: { // Agrega el método de pago
                    connect: { id: pago.metodoDePagoId } // Conéctalo con el método de pago existente por su ID
                }
            };
        });
    
        const factura = await prisma.factura.create({
            data: {
                numero: createFacturaDto.numero,
                fecha: createFacturaDto.fecha,
                total: createFacturaDto.total,
                pagos: {
                    create: pagos
                }
            }
        });
    
        res.json(factura);
    };
    
    
  
  
  
    public updateFactura = async( req: Request, res: Response ) => {
      const id = +req.params.id;
      const [error, updateFacturaDto] = UpdateFacturaDto.create({...req.body, id});
      if ( error ) return res.status(400).json({ error });
      
      const factura = await prisma.factura.findFirst({
        where: { id }
      });
      if ( !factura ) return res.status( 404 ).json( { error: `Factura with id ${ id } not found` } );
      const updatedFactura = await prisma.factura.update({
        where: { id },
        data: updateFacturaDto!.values
      });
      res.json( updatedFactura );
    }
  
  
    public deleteFactura = async(req:Request, res: Response) => {
      const id = +req.params.id;
      const factura = await prisma.factura.findFirst({
        where: { id }
      });
  
      if ( !factura ) return res.status(404).json({ error: `Factura with id ${ id } not found` });
      const deleted = await prisma.factura.delete({
        where: { id }
      });
      ( deleted ) 
        ? res.json( deleted )
        : res.status(400).json({ error: `Factura with id ${ id } not found` });
    }
  }
