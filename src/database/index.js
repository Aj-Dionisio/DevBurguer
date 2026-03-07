/*confiqurando o sequelize com o db e com a model*/

import Sequelize from 'sequelize';
import mongoose from 'mongoose'
import databaseConfig from '../config/database.cjs';
import User from '../app/models/User.js';
import Products from '../app/models/Product.js';
import Categorie from '../app/models/Categories.js';

const models = [User, Products, Categorie]; //ONDE FAZEMOS O LINK DO MODELS COM O DB

class Database {
  constructor() {
    /*sempre que a classe é iniciada o metodo é chamado*/
    this.init(); /*this faz referencia a classe Database*/
    this.mongo();/*chamando o metodo de classe*/
  }

  init() {
    this.connection = new Sequelize(
  databaseConfig.development.database,
  databaseConfig.development.username,
  databaseConfig.development.password,
  {
    host: databaseConfig.development.host,
    dialect: databaseConfig.development.dialect,
    port: databaseConfig.development.port,
    define: databaseConfig.development.define,
  }
); /*this = Database, essa é a conxão com o db*/
    models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models));
  }

  mongo(){
    this.mongooseConnection = mongoose.connect('mongodb://localhost:27017/dev-burguer');
  }
}

export default new Database();
