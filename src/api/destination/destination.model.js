const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, unique: false, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "user" }],
    typycalFood: [{ type: Schema.Types.ObjectId, ref: "food" }],
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('destination', schema);