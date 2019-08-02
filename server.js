require('./models/db');
/* ejecutable */
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const sessionStorage = require('sessionstorage');
const controladorPersonaje = require('./controladores/controladorPersonaje');
const controladorPantalla = require('./controladores/controladorPantallas');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/vistas/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/vistas/layouts/'}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Server iniciado en el puerto 3000');
});

app.use('/personaje', controladorPersonaje);
app.use('/pantalla', controladorPantalla);
app.use('/aventura', express.static(__dirname + '/aventura'));
