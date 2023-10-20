import { Router } from "express";
import { UsuariosController } from "./controller";

export class UsuarioRoutes {
    static get routes(): Router {
      const router = Router();
      const usuarioController = new UsuariosController();
      router.get('/', usuarioController.getUsuarios);
      router.get('/:id', usuarioController.getUsuarioById);
      router.post('/', usuarioController.createUsuario);
      router.put('/:id', usuarioController.updateUsuario);
      router.delete('/:id', usuarioController.deleteUsuario);
      return router;
    }
  }
