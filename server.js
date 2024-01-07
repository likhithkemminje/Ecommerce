const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user_name_here',
    password: 'your_password',
    database: 'interior'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});


app.post('/store-contact', (req, res) => {
    var sql = `INSERT INTO contact SET ?`;

    console.log(req.body);

    connection.query(sql, req.body, function (err, data) {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'error occured' })
        } else {
            res.json({ success: true, message: 'Inserted successfully!!' })
        }
    });

});

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port${port}`);
});
