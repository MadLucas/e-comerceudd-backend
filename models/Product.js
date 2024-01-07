const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    categories: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model("programingbooks", productSchema);

module.exports = Product;
