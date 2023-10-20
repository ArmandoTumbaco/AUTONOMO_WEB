import { Router } from "express";
import { CompraController } from "./controller";

export class CompraRoutes {
    static get routes(): Router {
      const router = Router();
      const compraController = new CompraController();
      router.get('/', compraController.getCompra);
      router.get('/:id', compraController.getCompraById);
      router.post('/', compraController.createCompra);
      router.put('/:id', compraController.updateCompra);
      router.delete('/:id', compraController.deleteCompra);
      return router;
    }
  }
