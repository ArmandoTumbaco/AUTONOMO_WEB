import { Router } from "express";
import { PagosController } from "./controller";

export class PagoRoutes {
    static get routes(): Router {
      const router = Router();
      const pagoController = new PagosController();
      router.get('/', pagoController.getPagos);
      router.get('/:id', pagoController.getPagoById );
      router.post('/', pagoController.createPago );
      router.put('/:id', pagoController.updatePago );
      router.delete('/:id', pagoController.deletePago);
      return router;
    }
  }
