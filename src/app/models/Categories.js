
import Sequelize, { DataTypes, Model } from 'sequelize';


class Categorie extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          
        },

        path: Sequelize.STRING,
        url:{ // para fazer a listagem dos prodtuos
                  type: Sequelize.VIRTUAL,//metodo do sequelize, foi necessário fazer a importação do sequelize novamente 
                  get(){
                    return `http://localhost:3001/categories-file/${this.path}` // para apresentar a url da imagem, ao subir nosso projeto teremos de substituir o localhost pela url da aplicação
                  }
                }
      },
      {
        sequelize,
        tableName: 'categories',
        underscored: true,
        timestamps: true, // garante created_at e updated_at automáticos
      },
    );

    return this

  }
}

export default Categorie;


// campo virtual
// GET -> PRODUTO -> MONTA O PRODUTO COM O SEUS DADOS
