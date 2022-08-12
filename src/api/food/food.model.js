const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, unique: false, required: true },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('food', schema);