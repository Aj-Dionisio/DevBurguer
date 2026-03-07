import express from 'express'; //trazendo o express para a aplicação
import routers from './routes.js'; // importando as rotas
import cors from 'cors';



import './database/index.js';
import fileRoutersConfig from './config/filerouters.cjs';

const app = express(); //informando que todas as funcionalidades disponiveis no express estarão disponiveis nessa variavel
app.use(cors()); //permitindo a entrada de todos no aplicativo, quanto tiver a URL do frontend colocar nos parenteses 
app.use(express.json()); // informando para o express que vamos usar json
app.use(express.urlencoded({ extended: true }));
app.use('/categories-file', fileRoutersConfig);
app.use('/product-file', fileRoutersConfig); // configuração para que, quando jogar a url da imagem bata na pasta de upload, assim aparecendo a imagem no navegador

app.use(routers);

export default app;
