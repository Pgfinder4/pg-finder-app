const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    contact: {
        type: Number,
        default: 0
    },
    address: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    continents: {
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


propertySchema.index({
    title: 'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Property = mongoose.model('Property', propertySchema);

module.exports = { Property }