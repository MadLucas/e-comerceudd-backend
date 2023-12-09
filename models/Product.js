const mongoose = require('mongoose');

const colorsSchema = new mongoose.Schema({
    red: {
        type: String
    },
    blue: {
        type: String
    }
});

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 6
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 130,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000000
    },
    image: String,
    details: {
        typeProduct: {
            type: String
        },
        material: {
            type: String
        },
        weight: {
            type: Number,
            min: 0.1
        },
        color: [colorsSchema] // Usando el esquema de colores directamente aquí
    },
    stock: {
        type: Number,
        min: 0,
        max: 100
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, colorsSchema }; // Exportando el modelo y el esquema de colores
