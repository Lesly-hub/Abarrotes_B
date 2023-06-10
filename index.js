const express=require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const Producto=require('./producto');
const app=express();

//Settings
app.set('port',process.env.PORT || 3300);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

//Connection to Mongodb Atlas
mongoose.connect("mongodb+srv://prueba:prueba@pedidos.dvadf.mongodb.net/abarrotesdb?retryWrites=true&w=majority")
.then(db=> console.log("El mondongo funcia"))
.catch(err=> console.log(err))

//Routes
app.get("/",async(req,res)=>{
    const productos=await Producto.find();
    res.json(productos);
});
app.post("/insertar/",async(req,res)=>{
    const productoInsertado = new Producto(req.body);
    await productoInsertado.save()
    res.json(productoInsertado);
});
app.get("/:cb",async(req,res)=>{
    const producto=await Producto.findOne({
        codigobarras:req.params.cb
    });
    res.json(producto);
});
app.put("/actualizar/:cb",async(req,res)=>{
    await Producto.findOneAndUpdate({codigobarras:req.params.cb},req.body);
    res.json({'Status':'Actualizado'})
});
app.delete("/borrar/:cb",async(req,res)=>{
    await Producto.findOneAndDelete({codigobarras:req.params.cb},req.body);
    res.json({'Status':'Eliminado'})
});
app.listen(app.get('port'),()=>{
    console.log("Server on port: " + app.get('port'));
});

