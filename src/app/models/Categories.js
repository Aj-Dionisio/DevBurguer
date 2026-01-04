
import { DataTypes, Model } from 'sequelize';

class Categorie extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          
        },
      },
      {
        sequelize,
        tableName: 'categories',
        underscored: true,
        timestamps: true, // garante created_at e updated_at automáticos
      },
    );
  }
}

export default Categorie;


// campo virtual
// GET -> PRODUTO -> MONTA O PRODUTO COM O SEUS DADOS
