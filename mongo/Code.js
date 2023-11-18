const mongoose = require('mongoose');
let codeSchema = mongoose.Schema({
    code: String,
    status: String,
    date: String,
    username: String,
});

codeSchema.methods.obtenerDatos = function () {
    const data = this.username;
    console.log(data);
};

let Code = mongoose.model('codigos', codeSchema);

module.exports = Code;