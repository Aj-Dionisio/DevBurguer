import * as Yup from "yup";
import User from "../app/models/User.js";
import bcrypt from "bcrypt";

class Sessioncontroller{

    async store(req, res){
        const schema = Yup.object({  /*Verificação se o email e senha está de acordo com os nossos parametros*/
            email: Yup.string().email().required(), /*o email deve ser uma string, vai fazer a verificação se é um email e será obrigatório*/
            password:Yup.string().required().min(6),/*Verifica se  é uma string e é obrigatório*/

        });

        const isValid = await schema.isValid( req.body, {strict: true}); /*método do schema para fazer a verificação*/

        const emailOrPassWordIncorrect = ()=> { /*variavel criada para tirar a redundancia do codigo, a veificação estava sendo usada vairas vezes*/
                 return res.status(400).json({error: "E-mail/password incorrect "}) /*Caso o usuário não seja valido retorna que está incorrerto, SEM DAR DICA DO QUE ESTÁ ERRADO POR QUESTÃO DE  SEGURANÇA*/

        }

        if(!isValid){
           emailOrPassWordIncorrect();
        }

        const {email, password} = req.body; /*Após a verificação*/

        const existUser = await User.findOne({
            where:{
                email
            }
        
        })

        if(!existUser){ /*Verificando se o email existe no banco de dados*/
           emailOrPassWordIncorrect();
        }


        const isPasswordCorrect = await bcrypt.compare(password, existUser.password_hash);

        if(!isPasswordCorrect){ /*Verificando se a senha existe no banco de dados*/
          emailOrPassWordIncorrect();
        }



        
        return res.status(200).json({
            id: existUser.id,
            name: existUser.name,
            email: existUser.email,
            admin: existUser.admin,
        });


    }

}

export default new Sessioncontroller();