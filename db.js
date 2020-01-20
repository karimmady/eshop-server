var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "eshop"
});
var mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/eshop`, {useNewUrlParser: true })
.then(_ => console.log(`Connected to mongo database: eshop`))
.catch(error => logger.error(error))  

con.connect((err) => {
    if (err) {
        console.error("Failed to connect to database- throwing error:");
        throw err;
    }
        console.log("Connected to Maria database succesfully.");
    }
);

module.exports.mycon = con;