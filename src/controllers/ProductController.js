import * as Yup from 'yup';
import Product from '../app/models/Product.js';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: err.errors,
      }); /*passando o erro para o usuário, dessa forma aparece na tela o que está errado*/
    }

    const { name, price, category } = req.body;
    const path = req.file?.filename;
    

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
      category,
      path: path || null,
    });

    return res.status(201).json({
      Id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      path: product.path,
    });
  }
}

export default new ProductController();
