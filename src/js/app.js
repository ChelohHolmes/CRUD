var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hola', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    try {
        hamana = process.argv[2];
        db.collection('hola').find(
            {User: JSON.parse(hamana.User)},
            {Password: 0, _id: 0}
            ).toArray((err, items) => {
                console.log(items);
                if (items === JSON.parse(hamana.Password)) {
                    console.log('Yes');
                    //Contraseña buena
                } else {
                    //Contraseña mala
                    console.log('Bruh');
                }
        });
    } catch (e) {
        console.log(e);
    }
    db.close();
});