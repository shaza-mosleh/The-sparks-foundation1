var mysql = require('mysql');


module.exports.getCustomers = function getCustomers(callBack) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bankingg_system'
    });
    connection.connect();

    connection.query('SELECT * From customers;', function (error, results) {
        if (error) throw error;
        callBack(results);

    });

    connection.end();
}
module.exports.makeTransaction = function makeTransaction(sender_id, receiver_id, amount, res) {
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'bankingg_system'
    });
    db.connect();
    const selectSenderQuery = `SELECT * FROM customers WHERE id = ${sender_id}`;

    db.query(selectSenderQuery, [sender_id], (err, senderResult) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching sender details' });
            return;
        }

        const selectRecipientQuery = `SELECT * FROM customers WHERE id = ${receiver_id}`;
        db.query(selectRecipientQuery, [receiver_id], (err, recipientResult) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'An error occurred while fetching recipient details' });
                return;
            }

            if (senderResult[0].balance < amount) {
                res.status(400).json({ error: 'Insufficient balance' });
                return;
            }


            const updateSenderBalanceQuery = `UPDATE customers SET balance = ${senderResult[0].balance} - ${amount} WHERE id = ${sender_id}`;
            const updateRecipientBalanceQuery = `UPDATE customers SET balance = ${recipientResult[0].balance} + ${amount} WHERE id = ${receiver_id}`;

            db.query(updateSenderBalanceQuery, [amount, receiver_id], (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'An error occurred while updating sender balance' });
                    return;
                }
                db.query(updateRecipientBalanceQuery, [amount, receiver_id], (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'An error occurred while updating recipient balance' });
                        return;
                    }
                    res.status(200).json({ message: 'Transfer successful' });
                });

            });
        });
    });
}
