import { Router } from 'express';
import { CarritoController } from './controller';

export class CarritoRoutes {
  static get routes(): Router {
    const router = Router();
    const carritoController = new CarritoController();
    

    router.get('/', carritoController.getCarrito);
    router.get('/:id', carritoController.getCarritoById);
    router.post('/', carritoController.addProductoToCarrito);
    router.put('/:id', carritoController.updateCarritoItem);
    router.delete('/:id', carritoController.removeCarritoItem);
    
    return router;
  }
}
