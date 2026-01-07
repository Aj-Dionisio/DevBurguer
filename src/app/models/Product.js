import { Sequelize } from "sequelize"; 
import { DataTypes, Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          unique: true,
        },
        price: DataTypes.DECIMAL(10, 2),
       
        path:{
              type: DataTypes.STRING,
              allowNull: true,
        },

        url:{ // para fazer a listagem dos prodtuos
          type: Sequelize.VIRTUAL,//metodo do sequelize, foi necessário fazer a importação do sequelize novamente 
          get(){
            return `http://localhost:3001/product-file/${this.path}` // para apresentar a url da imagem, ao subir nosso projeto teremos de substituir o localhost pela url da aplicação
          }
        }
      },
      {
        sequelize,
        tableName: 'products',
        underscored: true,
        timestamps: true, // garante created_at e updated_at automáticos
      },
    );

    return this

  }

  static associate(models){
    this.belongsTo(models.Categorie, {
      foreignKey:"category_id",
      as: "category", 
    });
  }
}
export default Product;


// campo virtual
// GET -> PRODUTO -> MONTA O PRODUTO COM O SEUS DADOS
