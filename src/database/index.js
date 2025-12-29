/*confiqurando o sequelize com o db e com a model*/


import Sequelize from "sequelize";
import databaseConfig from "../config/database.cjs";
import User from "../app/models/User.js";
import Products from "../app/models/Product.js";

const models = [User, Products];


class Database{
    constructor(){/*sempre que a classe é iniciada o metodo é chamado*/
        this.init();/*this faz referencia a classe Database*/
    }


    init(){
        this.connection = new Sequelize(databaseConfig);/*this = Database, essa é a conxão com o db*/
        models.map((model) => model.init(this.connection));/**/
    }

}

export default new Database();