import { Router } from "express";
import { FacturasController } from "./controller";

export class FacturaRoutes {
    static get routes(): Router {
      const router = Router();
      const facturaController = new FacturasController();
      router.get('/', facturaController.getFacturas);
      router.get('/:id', facturaController.getFacturaById );
      router.post('/', facturaController.createFactura );
      router.put('/:id', facturaController.updateFactura );
      router.delete('/:id', facturaController.deleteFactura );
      return router;
    }
  }
