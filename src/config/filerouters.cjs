const { resolve } = require('node:path'); // quando utilizar o resolve tem que utiliar o require 
const express = require('express'); //vamos utilizar o express para buscar arquivos estaticos 

const uploadPath = resolve(__dirname,'..','..','uploads'); //passando o caminho da nossa pasta 

const fileRoutersConfig = express.static(uploadPath); //deixando a url diamica pois depois que a aplicação for publicada não termos mais a imagens no nosso computador mas sim na nuvem


module.exports =  fileRoutersConfig;