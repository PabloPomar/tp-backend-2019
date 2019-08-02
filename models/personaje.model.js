const mongoose = require ('mongoose');

var personajeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: 'este campo es obligatorio.'
    },
    edad: {
        type: Number, min: 0, max: 150
    },
    profesion: {
      type: String
    },
    historia: {
        type: String
    }

});

mongoose.model('Personaje', personajeSchema);