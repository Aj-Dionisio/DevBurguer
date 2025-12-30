import express from 'express'; //trazendo o express para a aplicação
import routers from './routes.js'; // importando as rotas
import './database/index.js';

const app = express(); //informando que todas as funcionalidades disponiveis no express estarão disponiveis nessa variavel

app.use(express.json()); // informando para o express que vamos usar json
app.use(express.urlencoded({ extended: true }));

app.use(routers);

export default app;
