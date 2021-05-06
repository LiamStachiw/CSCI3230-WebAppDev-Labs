const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/purchases.db', (err) => {
    if (err) {
        console.error('Error while connecting to database: ', err);
    } else {
        console.log('Connected to or created SQLite database');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS purchases(purchaseId INTEGER PRIMARY KEY,
                                                 movie_id INTEGER,
                                                 movie_title TEXT,
                                                 location_id INTEGER,
                                                 location TEXT,
                                                 selected_date DATETIME,
                                                 start_time TEXT,
                                                 quantity INTEGER,
                                                 confirmation_number TEXT)`);
});

function getAllPurchases() {
    db.all('SELECT * FROM purchases', (err, rows) => {
        if(err) {
            throw err;
        }

        return rows;
    });
}

function addPurchase(movie_id, movie_title, location_id, location, selected_date, start_time, quantity, confirmation_number) {
    db.run(`INSERT INTO purchases(movie_id, movie_title, location_id, location, selected_date, start_time, quantity, confirmation_number) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [movie_id, movie_title, location_id, location, selected_date, start_time, quantity, confirmation_number],
            function(err) {
                if(err){
                    return console.log(err.message);
                }
                return console.log('Record inserted, purchaseID = ' + this.lastID);
            })
}

function deletePurchase(purchaseId) {
    db.run('DELETE FROM purchases WHERE purchaseId = ?', purchaseId, function(err) {
        if(err){
            return console.log(err.message);
        }
        return console.log('Row Deleted');
    })
}

module.exports = {
    db,
    getAllPurchases,
    addPurchase,
    deletePurchase
}