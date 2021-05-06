const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/showtimes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(error) {
    if(error) {
        console.error('Unable to connect: ', error);
    } else {
        console.log('Connected to MongoDB');
    }
});
mongoose.set('useCreateIndex', true);

let Schema = mongoose.Schema;
let showtimesSchema = new Schema({
    id: String,
    title: String,
    location: String,
    date: String,
    times: Array
}, {
    collection: 'showtimes'
});

module.exports.Showtimes = mongoose.model('showtimes', showtimesSchema)