import { Router } from 'express';
import { CategoriasController } from './controller';

export class CategoriasRoutes {
  static get routes(): Router {
    const router = Router();
    const categoriasController = new CategoriasController();

    router.get('/', categoriasController.getCategorias);
    router.get('/:id', categoriasController.getCategoriaById);
    router.post('/', categoriasController.createCategoria);
    router.put('/:id', categoriasController.updateCategoria);
    router.delete('/:id', categoriasController.deleteCategoria);
    
    return router;
  }
}
