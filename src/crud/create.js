const client = require("../mongo")
const database = require("../database");


module.exports = async (req, res, col) => {   

    await client.connect();
    try {
        const db = client.db(database);

        const collection = db.collection(col);
        //const {nome,telefone} = req.body;   
        const result = await collection.insertOne(req.body);

        res.send(result);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}