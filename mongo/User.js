const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    name: String,
    nickname: String,
    tipoId: String,
    id: Number,
    email: String,
    celular: Number,
    isMedic: Number,
    code: String,
    sexo: Number,
    contrasenia: String,
});

userSchema.methods.obtenerDatos = function () {
    const data = this.name;
    console.log(data);
};

let User = mongoose.model('usuarios', userSchema);

module.exports = User;