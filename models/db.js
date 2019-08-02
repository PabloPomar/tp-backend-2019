const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PersonajesDB', {useNewUrlParser: true} , (err)=> {
    if(!err) {console.log('Conección a la base de datos de MongoDB lograda')}
    else {console.log('Error al conectarse a la base de datos de MongoDB:' + err)}
});

require('./personaje.model');