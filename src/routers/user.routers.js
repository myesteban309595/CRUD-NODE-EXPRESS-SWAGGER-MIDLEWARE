const express = require('express');
const Uroute = express.Router();

const {UpdateUser,DeleteUser,AddUser,GetUserById,GetUser} = require('../models/users.model');

Uroute.get('/', (req,res)=> {

    res.json(GetUser())
    console.table(GetUser());
    console.log(("se han obtenido todos los usuarios ").bgCyan.black)
})

//? ****************  REGISTRO DE USUARIO LOGIN ************************

Uroute.post('/', (req, res) => {

    const {id,name,lastname,phone,email,sex,password} = req.body;

    const NewUser = {
        id: id,
        name:name,
        lastname: lastname,
        phone: phone,
        email:email,
        sex:sex,
        password: password,
        admin : false
    }
    AddUser(NewUser);

    res.json("se ha creado el usuario")
    console.table(NewUser);
    console.log(("se ha creado un nuevo usuario ").bgGreen.black);
});

Uroute.put('/:id', (req,res)=> {

 const {name,lastname,phone,email,sex,password} = req.body;
 const {id} = req.params

 let validation = false;
 
 if(id)
 {
     //console.log(name,lastname,phone,email,sex);  OK
     validation = true;
     console.log(("se ha editado el usuario: ").yellow);
     
     const productoAeditar = GetUserById(id);
     console.table(productoAeditar);
     console.log(("se ha actualizado un usuario ").bgCyan.black);
     
     UpdateUser(id,name,lastname,phone,email,sex)
 }

 validation ? res.json("se ha actualizado el usuario satisfactoriamente") : res.status(400).json("el usuario o id no existen")


})

Uroute.delete('/:id',(req,res) => {
    
    const {id} = req.params;
    res.json("se ha eliminado el usuario ")
    console.table(GetUserById(id));
    console.log(("usuario eliminado ").bgRed);
    
    DeleteUser(id);
})

module.exports = Uroute;

