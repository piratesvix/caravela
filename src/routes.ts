import { Router } from 'express';

import * as validate from './middlewares/validate';
import * as homeController from './controllers/home';
import * as candidatoController from './controllers/candidato';
import * as authController from './controllers/auth';
import authenticate from './middlewares/authenticate';
import { loginSchema } from './validators/loginRequest';
import { candidatoPOSTSchema } from './validators/candidatoRequest';
import validateRefreshToken from './middlewares/validateRefreshToken';

const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate.schema(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/candidatos', authenticate, candidatoController.index);
router.post(
  '/candidatos',
  authenticate,
  validate.schema(candidatoPOSTSchema),
  candidatoController.store
);

export default router;