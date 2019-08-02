const express = require('express');
var router2 = express.Router();
module.exports = router2;
const mongoose = require('mongoose');
const Personaje = mongoose.model('Personaje');


router2.get('/test', (req, res) =>{
    res.render("pantallas/test", {
        viewTitle : "Pantalla de test"
    })
});

router2.get('/principal/:id', (req, res) =>{
    Personaje.findById(req.params.id, (err, doc)=>{
        if (!err){
            res.render("pantallas/principal",{
                personaje: doc
            });
        }
    });
});

