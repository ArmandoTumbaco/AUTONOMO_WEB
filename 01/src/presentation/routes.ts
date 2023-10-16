import { Router } from 'express';

import { EnvioRoutes } from './envio/routes';
import { CarritoRoutes } from './carito/routes';
import { OpinionClienteRoutes } from './opinion/routes';
import { UsuarioRoutes } from './usuario/routes';
import { CompraRoutes } from './compra/routes';
import { HistorialCompraRoutes } from './historialcompra/routes';
import { PagoRoutes } from './pago/routes';
import { MetodoDePagoRoutes } from './metododepago/routes';
import { FacturaRoutes } from './factura/routes';
import { CategoriasRoutes } from './categoria/routes';
import { ProveedoresRoutes } from './proveedor/routes';
import { ProductosRoutes } from './producto/routes';
export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/envio', EnvioRoutes.routes );
    router.use('/api/carito', CarritoRoutes.routes );
    router.use('/api/opinion', OpinionClienteRoutes.routes );
    router.use('/api/usuario', UsuarioRoutes.routes );
    router.use('/api/compra', CompraRoutes.routes );
    router.use('/api/historialcompra', HistorialCompraRoutes.routes );
    router.use('/api/pago', PagoRoutes.routes );
    router.use('/api/metododepago', MetodoDePagoRoutes.routes );
    router.use('/api/factura', FacturaRoutes.routes );
    router.use('/api/categoria', CategoriasRoutes.routes );
    router.use('/api/proveedor', ProveedoresRoutes.routes );
    router.use('/api/producto', ProductosRoutes.routes );
    return router;
  }


}

