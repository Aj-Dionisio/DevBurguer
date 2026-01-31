import jwt from 'jsonwebtoken';
import authConfig from './../config/auth.js'
import { defaults } from 'pg';


const authMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;



  if (!authToken) {/*caso ão exista*/ 
    return res.status(401).json({ error: 'Token not provided' }); //responde que o token não foi fornecido ou não existe
  }
  const token = authToken.split(' ')[1]; //fazendo a separação do token em duas partes mas so pegando a segunda

  
  try {
    jwt.verify(token,authConfig.secret, (error, decoded) =>{
        if(error){
            throw Error();
        }
        
        req.userID = decoded.id // criando um parametro/campo de nome userID detro do request
        req.userIsAdmin = decoded.admin;
    });
    
  } catch (_error) {
    return res.status(401).json({ error: 'Token not valid' });
    }

    return next();
};

export default authMiddleware;
