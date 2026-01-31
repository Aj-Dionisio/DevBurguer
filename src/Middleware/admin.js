const adminMiddleware = (req, res, next) => {
  const isUserAdmin = req.userIsAdmin;



  if (!isUserAdmin) {/*caso ão exista*/ 
    return res.status(401).json(); //responde que o token não foi fornecido ou não existe
  }


    return next();
};

export default adminMiddleware;
