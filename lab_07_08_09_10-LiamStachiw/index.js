let QRCode = require('qrcode');
let express = require('express');
let app = express();

const { v4: uuidv4 } = require('uuid');
const model = require('./model/model.js');
const sqliteModel = require('./model/purchases_model');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');

app.get('/', function(request, response) {
    response.redirect('/showtimes_api')
});

app.get('/movie', function(request, response) {
    response.sendFile('movie.html', {root: __dirname + "/public/"});
});

app.get('/showtimes', function(request, response) {
    model.Showtimes.find().then(function(showtimesList){
        response.sendFile('showtimes.html', {root: __dirname + "/public/"});
    });   
});

app.get('/showtimes_api', function(request, response) {
    response.render('showtimes_get'); 
});

app.post('/showtimes_api', function(request, response) {
    let date = request.body.selected_date;
    date = date.replace('-', '/');
    date = date.replace('-', '/');

    model.Showtimes.find({location: request.body.location_id, date: date}).then(function(showtimesList){
        response.render('showtimes', {showtimesList: showtimesList});
    })
});

app.get('/buyTickets', function(request, response) {
    response.render('buyTickets', {
        movie_title: request.query.movie_title,
        location: request.query.location,
        selected_date: request.query.selected_date,
        start_time: request.query.start_time
    });
});

app.post('/buyTickets', function(request, response) {
    var confirmation_number = uuidv4();

    QRCode.toFile('./public/images/qr_codes/code.png', confirmation_number, {
        width: 500
    }, function(err) {
        if (err) throw err
    });

    //TODO: All the SQLite stuff once we learn it
    sqliteModel.addPurchase(request.body.movie_id, 
                            request.body.movie_title,
                            request.body.location_id,
                            request.body.location,
                            request.body.selected_date,
                            request.body.start_time,
                            request.body.quantity,
                            confirmation_number);
    
    response.render('confirmedPurchase', {
        confirmation_number: confirmation_number
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});