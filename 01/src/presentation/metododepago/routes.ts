import { Router } from "express";
import { MetodoDePagosController } from "./controller";

export class MetodoDePagoRoutes {
    static get routes(): Router {
      const router = Router();
      const metododepagoController = new MetodoDePagosController();
      router.get('/', metododepagoController.getMetodoDePagos);
      router.get('/:id', metododepagoController.getMetodoDePagosById );
      router.post('/', metododepagoController.createMetodoDePago );
      router.put('/:id', metododepagoController.updateMetodoDePago );
      router.delete('/:id', metododepagoController.deleteMetodoDePago);
      return router;
    }
  }
