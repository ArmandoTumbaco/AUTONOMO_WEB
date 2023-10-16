import { Router } from 'express';
import { EnvioController } from './controller';

export class EnvioRoutes {
  static get routes(): Router {
    const router = Router();
    const envioController = new EnvioController();
    
    // Rutas para la entidad "Envio"
    router.get('/', envioController.getEnvios);
    router.get('/:id', envioController.getEnvioById);
    router.post('/', envioController.createEnvio);
    router.put('/:id', envioController.updateEnvio);
    router.delete('/:id', envioController.deleteEnvio);
    
    return router;
  }
}
