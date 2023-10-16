import { Router } from 'express';
import { ProveedoresController } from './controller';

export class ProveedoresRoutes {
  static get routes(): Router {
    const router = Router();
    const proveedoresController = new ProveedoresController();

    router.post('/', proveedoresController.createProveedor);
    router.put('/:id', proveedoresController.updateProveedor);
    router.delete('/:id', proveedoresController.deleteProveedor);

    return router;
  }
}
