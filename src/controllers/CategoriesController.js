import * as Yup from 'yup';
import Categorie from '../app/models/Categories.js';

class CategoriesController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: err.errors,
      }); /*passando o erro para o usuário, dessa forma aparece na tela o que está errado*/
    }
    
    
    const { name } = req.body;
    const filename = req.file?.filename || null; 

    

    const existCategory = await Categorie.findOne({
      where: {
        name,
      },
    });

    if (existCategory) { // validando que não está repetido
      return res.status(400).json({ message: 'Category already cadastrated!' });
    }
   

    const newcategorie = await Categorie.create({ // criando a nova categoria
      name,
      path: filename,
     
    });

    return res.status(201).json({
      name: newcategorie.name,
      path: newcategorie.path, 
      url: newcategorie.url,
      
    });
  }

    async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: err.errors,
      }); /*passando o erro para o usuário, dessa forma aparece na tela o que está errado*/
    }
    
    
    const { name } = req.body;
    const {id} = req.params;

    let path
    if(req.file){
      const filename = req.file?.filename || null;
      path = filename
    }
     

    

    const existCategory = await Categorie.findOne({
      where: {
        name,
      },
    });

    if (existCategory) { // validando que não está repetido
      return res.status(400).json({ message: 'Category already cadastrated!' });
    }
   
await Categorie.update({ // criando a nova categoria
        name,
        path,
      },{
          where:{
            id,
          } 

        },
      
  );

    return res.status(200).json();
  }

  

  async index(_req, res) {// para fazer a listagem dos nossos produtos

    const categorie = await Categorie.findAll();


    return res.status(200).json(categorie)
  }
}

export default new CategoriesController();
