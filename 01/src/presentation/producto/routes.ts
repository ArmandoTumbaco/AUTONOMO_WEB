import { Router } from 'express';
import { ProductosController } from './controller';

export class ProductosRoutes {
  static get routes(): Router {
    const router = Router();
    const productosController = new ProductosController();

    router.post('/', productosController.createProducto);
    router.put('/:id', productosController.updateProducto);
    router.delete('/:id', productosController.deleteProducto);

    return router;
  }
}
