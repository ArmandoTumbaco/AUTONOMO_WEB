import { Router } from 'express';
import { OpinionClienteController } from './controller';

export class OpinionClienteRoutes {
  static get routes(): Router {
    const router = Router();
    const opinionClienteController = new OpinionClienteController();
    
    
    router.get('/', opinionClienteController.getOpinionCliente);
    router.post('/', opinionClienteController.createOpinionCliente);
    router.get('/:id', opinionClienteController.getOpinionClienteById);
    router.put('/:id', opinionClienteController.updateOpinionCliente);
    router.delete('/:id', opinionClienteController.deleteOpinionCliente);

    return router;
  }
}
