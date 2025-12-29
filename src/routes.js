// criação das rotas da nossa aplicação

import { Router} from 'express'
// import User from './app/models/user.js';
import UserController from './controllers/UserController.js';
import SessionController from './controllers/SessionController.js';

/*
METODOS HTTP:

POST -  CRIAR
PUT/PATCH - ATUALIZAR -> PUT PARA ATUALIZAR MAIS DE UM DADO, PATCH PARA ATUALIZAR SOMENTE UM DADO
GET -  PARA LISTAR
DELETE - DELETAR 
*/


const routers = new Router();

routers.post('/users', UserController.store);
routers.post('/session',SessionController.store);

export default routers;