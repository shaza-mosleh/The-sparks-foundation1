const cors = require('cors')
const express = require('express');
const app = express();
const port = 3000;
const db= require("./database");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    db.getCustomers(customers => { res.send(customers) });

});


app.post('/transfer', (req, res) => {
    
    db.makeTransaction(req.body.sender_id,req.body.receiver_id,req.body.amount,res);
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});