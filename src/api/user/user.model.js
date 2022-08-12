const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcryp = require('bcrypt');
const {validationPassword, setError} = require ('../../helpers/utils/utils');


const schema = new Schema({
    img: { type: String, unique: false },
    email: { type: String, unique: true, required: true },
    nickname: { type: String, required: true, unique: true },
    password:  {type: String, required: true },
    feed: { type: Array, required: false},
    friend: [{ type: Schema.Types.ObjectId, ref: "user" }],
    favPlaces: [{ type: Schema.Types.ObjectId, ref: "destination" }],
},
    {
        timestamps: true
    }
);

schema.pre('save', function (next){
    if (!validationPassword(this.password)) return next (setError('400','Contraseña Invalida '))
    this.password =bcryp.hashSync(this.password, 16);
    next();



});


module.exports = mongoose.model('user', schema);