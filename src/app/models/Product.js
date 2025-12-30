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
        category: DataTypes.STRING,
        path: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'products',
        underscored: true,
        timestamps: true, // garante created_at e updated_at automáticos
      },
    );
  }
}

export default Product;
