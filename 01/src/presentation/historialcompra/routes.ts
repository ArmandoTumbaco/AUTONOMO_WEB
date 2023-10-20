import { HistorialCompraController } from "./controller";
import { Router } from "express";

export class HistorialCompraRoutes {
    static get routes(): Router {
      const router = Router();
      const historialCompraController = new HistorialCompraController();
      router.get('/', historialCompraController.getHistorialCompra);
      router.get('/:id', historialCompraController.getHistorialCompraById);
      router.post('/', historialCompraController.createHistorialCompra);
      router.put('/:id', historialCompraController.updateHistorialCompra);
      router.delete('/:id', historialCompraController.deleteHistorialCompra);
      return router;
    }
  }
