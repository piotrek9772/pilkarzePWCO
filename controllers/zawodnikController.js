const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Zawodnik = mongoose.model('Zawodnik');

router.get('/', (req,res) => {
    res.render("zawodnik/dodajLubEdytuj", {
        viewTitle : "Dodaj zawodnika"
    });
});

router.post('/', (req,res) => {
    if(req.body._id == '')
        insertRecord(req,res);
    else 
        updateRecord(req, res);
})

function insertRecord(req, res) {
    var zawodnik = new Zawodnik();
    zawodnik.imie = req.body.imie;
    zawodnik.nazwisko = req.body.nazwisko;
    zawodnik.kraj = req.body.kraj;
    zawodnik.klub = req.body.klub;
    zawodnik.pozycja = req.body.pozycja;
    zawodnik.data_urodzenia = req.body.data_urodzenia;
    zawodnik.wzrost = req.body.wzrost;
    zawodnik.save((err, doc) => {
        if(!err) 
            res.redirect('zawodnik/lista');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("zawodnik/dodajLubEdytuj", {
                    viewTitle : "Dodaj zawodnika",
                    zawodnik : req.body
                });
            }
            else
                console.log('Błąd podczas dodawania zawodnika:' +err);
        }
    });
}

function updateRecord(req, res) {
    Zawodnik.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('zawodnik/lista'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("zawodnik/dodajLubEdytuj", {
                    viewTitle: 'Edytuj zawodnika',
                    zawodnik: req.body
                });
            }
            else
                console.log('Blad podczas edycji zawodnika : ' + err);
        }
    });
}

router.get('/lista', (req,res) => {
    Zawodnik.find((err, docs) => {
        if(!err) {
            res.render("zawodnik/lista", {
                list: docs
            });
        }
        else {
            console.log('Blad w trakcie wyswietlania listy zawodnikow' +err)
        }
    });
});

function handleValidationError(err, body) {
    for(field in err.errors) {
        switch (err.errors[field].path) {
            case 'imie':
                body['imieError'] = err.errors[field].message;
                break;
            case 'nazwisko':
                body['nazwiskoError'] = err.errors[field].message;
                break;
            case 'kraj':
                body['krajError'] = err.errors[field].message;
                break;
            case 'klub':
                body['klubError'] = err.errors[field].message;
                break;
            case 'pozycja':
                body['pozycjaError'] = err.errors[field].message;
                break;
            case 'data_urodzenia':
                body['dataUrodzeniaError'] = err.errors[field].message;
                break;
            case 'wzrost':
                body['wzrostError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req,res) => {
    Zawodnik.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render("zawodnik/dodajLubEdytuj", {
                viewTitle : "Edytuj zawodnika",
                zawodnik : doc
            });
        }
    });
});

router.get('/usun/:id', (req, res) => {
    Zawodnik.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/zawodnik/lista');
        }
        else { console.log('Blad przy usuwaniu zawodnika :' + err); }
    });
});

module.exports = router;