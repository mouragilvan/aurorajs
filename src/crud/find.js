const client = require("../mongo")

const database = require("../database")

const {ObjectId} = require('mongodb')



module.exports = async function (col, id) {
   
   await client.connect();
   try {
      let result = null;

      

      const db = client.db(database);

      const collection = db.collection(col);

      if (id) {

         // uid = new ObjectId(id); 
                       
         return await collection.findOne({ _id : id });

       
      } 
     

      return [];

   } catch(e){
      if(e.message=="input must be a 24 character hex string, 12 byte Uint8Array, or an integer"){
         return res.status(400).send({ message: "UID inválido" });
      }
      return res.status(400).send({ message: e.message });

   }finally {
      await client.close();
   }


}