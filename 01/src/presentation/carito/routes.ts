import { Router } from 'express';
import { CarritoController } from './controller';

export class CarritoRoutes {
  static get routes(): Router {
    const router = Router();
    const carritoController = new CarritoController();
    

    router.get('/:usuarioId', carritoController.getCarritoItems);
    router.post('/:usuarioId', carritoController.addProductoToCarrito);
    router.put('/:id', carritoController.updateCarritoItem);
    router.delete('/:id', carritoController.removeCarritoItem);
    
    return router;
  }
}
