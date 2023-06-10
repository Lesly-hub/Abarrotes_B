const { Schema, model } = require("mongoose");

const productoSchema= new Schema({
    codigobarras:{
        type:String,
        require:true,
        unique:true
    },
    descripcion:String,
    marca:String,
    preciocompra:Number,
    precioventa:Number,
    existencias:Number
},{
    versionKey:false,
    timestamps:true
});
module.exports=model('producto', productoSchema);