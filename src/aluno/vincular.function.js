const client = require("../mongo");
const database = require("../database");
const { ObjectId } = require("mongodb");

module.exports = async (req, res) => {
  await client.connect();
  const col = "alunos";
  try {
    const db = client.db(database);
    const collection = db.collection(col);

    const classId = new ObjectId(req.body.classe._id);
    const alunoId = new ObjectId(req.body.aluno._id);

    const aluno = await collection.findOne({ _id: alunoId }); 

    aluno.classes = [classId];


    await collection.updateOne({ _id: alunoId }, { $set: aluno })

    
    res.send(aluno);
  } catch (e) {
    console.error(e);
    // Tratando erros de maneira mais genérica
    return res.status(400).send({ message: "Ocorreu um erro durante a atualização do aluno" });
  } finally {
    await client.close();
  }
};
