import * as Yup from 'yup';
import Product from '../app/models/Product.js';
import Categorie from '../app/models/Categories.js';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.string().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: err.errors,
      }); /*passando o erro para o usuário, dessa forma aparece na tela o que está errado*/
    }

    const { name, price, category_id,offer } = req.body;
    // const path = req.file?.filename; => estava retornando path como null
    const filename = req.file?.filename || null;
    

    const existProduct = await Product.findOne({
      where: {
        name,
      },
    });

    if (existProduct) {
      return res.status(400).json({ message: 'Product already cadastrated!' });
    }
   

    const product = await Product.create({
      name,
      price: Number(price),
      category_id,
    //   path: path || null, => estava retornando path como null
        path: filename,
        offer,
    });

    return res.status(201).json({
      Id: product.id,
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      path: product.path,
    });
  }

  async update(req, res) 
  {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: err.errors,
      }); /*passando o erro para o usuário, dessa forma aparece na tela o que está errado*/
    }

    const { name, price, category_id, offer } = req.body;
    // const path = req.file?.filename; => estava retornando path como null
    const{id} = req.params /*parametros que vem na rota*/

    let path 
    if(req.file){
      const {filename} = req.file;
      path= filename;
  }
   

    await Product.update({
      name,
      price,
      category_id,
      path,
      offer,
    },
    {
      where:{
        id,
      },
    }
  );

    return res.status(200). json();
  }

  async index(_req, res) {// para fazer a listagem dos nossos produtos

    const product = await Product.findAll({
      include: {/**/
        model: Categorie,
        as: "category",
        attributes: ['id', 'name'] /*quais dados/ atibutos que eu quero trazer*/
      },
    });


    return res.status(200).json(product)
  }
}

export default new ProductController();
