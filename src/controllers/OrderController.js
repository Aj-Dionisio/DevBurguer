import * as Yup from 'yup';
import Product from "../app/models/Product.js"
import Categories from "../app/models/Categories.js"
import Order from "../app/Schemas/Order.js"


class OrderController {
async store(req, res) {

        const schema = Yup.object({
        products: Yup.array().required().of(
            Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required()
            })
        )
        });

        try {
          schema.validateSync(req.body, { abortEarly: false, strict: true });
        } catch (err) {
          return res.status(400).json({
            error: err.errors,
          }); /*passando o erro para o usuário, dessa forma aparece na tela o que está errado*/
        }

        const {userId, userName} = req;
        const {products} = req.body;

        const productIds = products.map(product => product.id)

        const findedProducts = await Product.findAll({
            where: {
                id:productIds,
            },
            include:{
              model: Categories,
              as: 'category',
              attributes: ['name']
            },
        });


        const mapedProducts = findedProducts.map( product => {
            const quantity = products.find(p => p.id === product.id).quantity;

            const newproduct ={
              id: product.id,
              name: product.name,
              price: product.price,
              url: product.url,
              category: product.category.name,
              quantity,
            }

            return newproduct
        })

        const order = {
            user: {
                id: userId,
                name: userName,
            },
            products: mapedProducts,
            status: "Pedido realizado"
        }

        const newOrder = await Order.create(order)


                return res.status(201).json(newOrder);
            
};
}


 export default new OrderController();
