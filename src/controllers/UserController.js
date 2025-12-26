/*
nomes especificos paa os metodos

store = criação de dados
index = lista todo os dados
show = listar um dado especifico
update = atualiza dados
delete = remover dados

OS METODOS  NÁO PODEM SE REPETIR

*/



import User from "../app/models/User.js";
import * as Yup from "yup";
import bcrypt from "bcrypt"


class UserController {
    async store(req, res){
        
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),/*min => tamanho minimo da senha*/
            admin: Yup.boolean()
        })
        try{
            
            schema.validateSync(req.body, {abortEarly: false, strict:true} ); 
        } catch(err){
            return res.status(400).json({error: err.errors});/*passando o erro para o usuário, dessa forma aparece na tela o que está errado*/
        }
        
        const {name, email,password, admin} = req.body;

        const existUser = await User.findOne({
            where:{
                email
            }
        
        })

        if(existUser){
            return res.status(400).json({message:"E-mail already taken!"})
        }
    
        const password_hash = await bcrypt.hash(password, 10);


    const user = await User.create({
        name,
        email,
        password_hash,
        admin: admin ?? false,
    });

    return res.status(201).json({
        Id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,

    })

    }

}

export default new UserController();