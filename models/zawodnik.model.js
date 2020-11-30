const mongoose = require('mongoose');

var zawodnikSchema = new mongoose.Schema({
    imie: {
        type: String,
        required: 'Uzupełnij pole imię!'
    },
    nazwisko: {
        type: String,
        required: 'Uzupełnij pole nazwisko!'
    },
    kraj: {
        type: String,
        required: 'Uzupełnij pole kraj!'
    },
    klub: {
        type: String,
        required: 'Uzupełnij pole klub!'
    },
    pozycja: {
        type: String,
        required: 'Uzupełnij pole pozycja!'
    },
    data_urodzenia: {
        type: Date,
        required: 'Uzupełnij pole data urodzenia!'
    },
    wzrost: {
        type: Number,
        required: 'Uzupełnij pole wzrost!'
    }
});

mongoose.model('Zawodnik', zawodnikSchema);