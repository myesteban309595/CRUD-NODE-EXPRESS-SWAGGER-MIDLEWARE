//? ******************* SWAGGER DOCUMENTATION **********************
const openAPI = require('./utils/swaggeroptions')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi= require('swagger-ui-express');
const swaggerSpecs = swaggerJsDoc(openAPI)
//? ****************************************************************

const express = require('express');  //* requerimos express
const colors = require('colors');

//require('dotenv').config(); // lo requerimos

const app = express();
const PORT = process.env.PORT || 3000 ; //* configuracion puerto de escucha


app.use(express.json()); //* convertir codigo maquina a json

//! ***********  R U T A S  G E N E R A L E S  ************** */
// ****************  RUTA DOCUMENTATION ********************* */

app.use('/APIswagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

//*****************   LOGIN Y REGISTRO  ********************* */

const signUp = require('./routers/signuser.router')
app.use('/ingreso', signUp);

//*******************  RUTAS ENDPOINTS  ********************* */

const usuarios = require('./routers/user.routers')
const productos = require('./routers/products.routers') 

app.use('/productos', productos);
app.use('/usuarios', usuarios);

//! ********************************************************* */

//todo configuramos el puerto de escucha de express

app.listen(3000, ()=> {

    console.log(("escuchando desde el puerto "+ PORT + " ").inverse);
})

console.log(("hola mundo ").black.bgYellow);

