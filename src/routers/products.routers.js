
const express = require('express');
const Prouter = express.Router();

const {GetProductsById,GetProducts,PostProduct,GetProductsByName,EditProduct,DeleteProduct} = require('../models/products.models'); // destructuro cada funcion

//* obtener productos

/**
 * @swagger
 * /productos:
 *  get:
 *      summary: obtiene todos los productos 
 *      tags: ['Productos']
 *      responses:
 *          200:
 *              description: se ha obtenido los Productos exitosamente
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/product'
 *          401: 
 *              description: no autorizado
 */

Prouter.get('/', (req,res)=> {
    res.json(GetProducts());
    console.table(GetProducts());
    console.log(("se han obtenido todos los productos ").bgGreen.black);
});

//todo obtener producto por su nobre o coincidencia del nombre

Prouter.get('/productname', (req,res)=> {
    const {BuscarName} = req.body;
    const Buscar = this.toString(BuscarName);
    GetProductsByName(Buscar);
    res.json("peticion enviada ")
})

//todo agregar un producto nuevo
/**
 * @swagger
 * /productos:
 *  post:
 *      summary: Crea un producto nuevo en el sistema
 *      tags: [Productos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          201:
 *              description: el Producto se ha creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: invalidado, no es administrador
 */
Prouter.post('/', (req,res)=> {
    
    const {id,name,price,category} = req.body;

    const NewProduct = {

        id : id,
        name : name,
        price : price,
        category : category
    }
    
    PostProduct(NewProduct); //! enviamos un parametro con el nuevo post al model

    res.json("producto agregado");
    console.table(NewProduct);
    console.log(("se han agregado un producto ").bgGreen.black);
});

//todo editar un producto
/**
 * @swagger
 * /productos/{id}:
 *  put:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto que desea editarse
 *        required: true
 *        schema:
 *         type: integer
 *      
 * 
 *      summary: edita un producto ya creado
 *      tags: [Productos]              
 *      requestBody:
 *          description: El producto con sus cambios
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     type: object
 *                     properties:
 *                         name:
 *                             type: string
 *                         price:
 *                             type: number
 *                         category:
 *                             type: string
 *      responses:
 *          200:
 *              description: Producto actualizado 
 *          400: 
 *              description: Entradas inválidas
 *          401: 
 *              description: no es administrador
 */
Prouter.put('/:id', (req,res) => {

    const {name,category} = req.body;
    const {price} = req.body;
    const {id} = req.params;

    let validacion = false;  //! solo valida si entra o no al if asi se si hay in id

    if(id)
    {
        //console.log(name,price,category); OK
        validacion = true; //! valida que ya esta dentro del if osea que existe un id
        console.log(("se ha editado el producto: ").yellow);

        const productoEditar = GetProductsById(id);
        console.table(productoEditar);
        console.log(("se ha editado un producto ").bgCyan.black);


        EditProduct(id,name,price,category);

    }

    validacion ? res.json("producto actualizado") : res.status(400).json("el id ingresado no existe") 

});

//todo eliminar un producto
/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto que desea eliminar
 *        required: true
 *        schema:
 *           type: integer
 * 
 *      summary: eliminar un producto (admin)
 *      tags: [Productos]  
 *         
 *      responses:
 *          200:
 *              description: Producto eliminado 
 *          400: 
 *              description: Entradas inválidas
 *          401: 
 *              description: administrador no autorizado
 */

Prouter.delete('/:id', (req,res) => {

    const {id} = req.params
    res.json('se ha eliminado el producto');
    console.table(GetProductsById(id))
    console.log(("producto eliminado ").bgRed);
   
    DeleteProduct(id)
});

module.exports = Prouter;  //! EXPORTAMOS LAS RUTAS

/**
 * @swagger
 * tags:
 *  name: 'Productos'
 *  descripcion: Relacionado con los productos del sistema
 * 
 * components:
 *  schemas:
 *      product:
 *          type: object
 *          required:
 *              -id
 *              -name
 *              -price
 *              -category
 *          properties:
 *              id: 
 *                  type: integer
 *              name:
 *                  type: string
 *              price: 
 *                  type: number
 *              category: 
 *                  type: string
 *          example:
 *              id: 8
 *              name: arroz
 *              price: 2000
 *              category : grain
 *
 */