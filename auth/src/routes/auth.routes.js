import express from 'express'
import passport from 'passport'
import * as authController from '../controller/auth.controller.js'
import * as validator from '../middleware/validator.middleware.js'
const routes = express.Router()

routes.post('/register', validator.registerUserValidationRules,authController.registerController)
routes.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  routes.get('/google/callback',
    passport.authenticate('google', { session: false }),
  authController.googleAuthCallback
  );
  
export default routes