const express = require('express');

const routes = express.Router();

const authController = require('./controllers/authController');

/** métodos de route
 * GET - pega informação
 * POST - salva, criando
 * PUT - altera, editação
 * DELETE - adivinha?
 */

routes.get('/', authController.signin);
routes.get('/signup', authController.signup);

routes.post('/register', authController.register);

module.exports = routes;
