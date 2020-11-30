const mongoose = require('mongoose');

mongoose.connect('mongodb://piotrek9772:Pietruszka%233344@dbaas250.hyperp-dbaas.cloud.ibm.com:29294,dbaas251.hyperp-dbaas.cloud.ibm.com:29366,dbaas252.hyperp-dbaas.cloud.ibm.com:29203/admin?authSource=admin&replicaSet=projekt&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
 {useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: true,
    sslCA: require('fs').readFileSync(`${__dirname}/db-certs/cert.pem`)
},(err) => { 
    if(!err) { console.log('Polaczono z baza danych') } 
    else { console.log('Blad polaczenia z baza danych') }
});

require('./zawodnik.model');