const client = require("../mongo")

const database = require("../database")

const { ObjectId } = require('mongodb')

module.exports = async function (req, res, col, resource) {

   try {
      let result = null;

      const id = req.params?.id;

      await client.connect();

      const db = client.db(database);

      const collection = db.collection(col);

      if (id) {

         uid = new ObjectId(id);

         result = await collection.findOne({ _id: uid });

      } else {
         result = await collection.find().toArray();
      }

      if (!result) {
         return res.status(404).send({ message: 'Informação não localizada' });
      }
      if (resource) {
         return res.send(await resource(result));
      }
      return res.send(result);

   } catch (e) {
      if (e.message == "input must be a 24 character hex string, 12 byte Uint8Array, or an integer") {
         return res.status(400).send({ message: "UID inválido" });
      }
      return res.status(400).send({ message: e.message });

   } finally {
      await client.close();
   }


}