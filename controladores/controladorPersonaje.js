const express = require('express');
var router = express.Router();
module.exports = router;
const mongoose = require('mongoose');
const Personaje = mongoose.model('Personaje');

router.get('/', (req, res) =>{
    res.render("personaje/addOrEdit", {
        viewTitle : "Insertar personaje"
    })
});

router.post('/' , (req, res) =>{
    if(req.body._id == ''){
        insertRecord(req, res);}
    else{
        updateRecord(req, res);}
});

function insertRecord(req, res) {
    var pers = new Personaje;
    pers.nombre= req.body.nombre;
    pers.edad = req.body.edad;
    pers.profesion = req.body.profesion;
    pers.historia = req.body.historia;
    pers.save((err, doc) => {
        if (!err)
            res.redirect('personaje/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("personaje/addOrEdit", {
                    viewTitle: "Insertar personaje",
                    personaje: req.body
                });
            }
            else
                console.log('Error durante la insercion de personaje: ' + err);
        }
    });
}

function updateRecord(req, res) {
    Personaje.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('personaje/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("personaje/addOrEdit", {
                    viewTitle: "Insertar personaje",
                    personaje: req.body
                });
            }
            else
                console.log('Error durante la actualizacion de personaje: ' + err);
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'nombre':
                body['nombreError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/list', (req, res) =>{
    Personaje.find((err, docs)=> {
        if (!err){
            res.render("personaje/list" , {
                list: docs
            });
        }
        else {
            console.log("Error en reclamar la lista de personajes: " + err);
        }
    });
});

router.get('/:id', (req, res) =>{
    Personaje.findById(req.params.id, (err, doc)=>{
        if (!err){
            res.render("personaje/addOrEdit",{
                viewTitle: "Actualizar personaje",
                personaje: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Personaje.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/personaje/list');
        }
        else { console.log('Error en el  borrado de personaje :' + err); }
    });
});

router.get('/detalle/:id', (req, res) => {
    Personaje.findById(req.params.id, (err, doc)=>{
            if (!err){
                res.render("personaje/detalle",{
                    personaje: doc
                });
            }
    });
});
