import { Router } from 'express';
import { CategoriasController } from './controller';

export class CategoriasRoutes {
  static get routes(): Router {
    const router = Router();
    const categoriasController = new CategoriasController();

    router.post('/', categoriasController.createCategoria);
    router.put('/:id', categoriasController.updateCategoria);
    router.delete('/:id', categoriasController.deleteCategoria);

    return router;
  }
}
