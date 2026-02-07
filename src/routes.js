// criação das rotas da nossa aplicação

import { Router } from 'express';
// import User from './app/models/user.js';
import UserController from './controllers/UserController.js';
import SessionController from './controllers/SessionController.js';
import ProductController from './controllers/ProductController.js';
import multer from 'multer';
import multerConfig from '../src/config/multer.cjs'
import authMiddleware from './app/Middleware/auth.js';
import CategoriesController from './controllers/CategoriesController.js';
import adminMiddleware from './app/Middleware/admin.js';
import OrderController from './controllers/OrderController.js';

/*
METODOS HTTP:

POST -  CRIAR
PUT/PATCH - ATUALIZAR -> PUT PARA ATUALIZAR MAIS DE UM DADO, PATCH PARA ATUALIZAR SOMENTE UM DADO
GET -  PARA LISTAR
DELETE - DELETAR 
*/

const routers = new Router();

const upload = multer(multerConfig )

routers.post('/users', UserController.store);
routers.post('/sessions', SessionController.store);

routers.use(authMiddleware); // todas as rotas a partir daqui vão exigir o token
routers.post('/products',adminMiddleware,upload.single("file"), ProductController.store);
routers.put('/products/:id',adminMiddleware,upload.single("file"), ProductController.update);/*PUT -> /products/5 SENDO 5 O ID A SER ATUALIZADO */
routers.get('/products', ProductController.index );//para listar os nossos produtos
routers.post('/categories',adminMiddleware,upload.single("file"), CategoriesController.store);
routers.put('/categories/:id',adminMiddleware,upload.single("file"), CategoriesController.update);
routers.get('/categories', CategoriesController.index )
routers.post('/orders', OrderController.store);
routers.put('/orders/:id',adminMiddleware, OrderController.update)
routers.get('/orders', OrderController.index);

export default routers;
