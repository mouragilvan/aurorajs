const client = require("../mongo");
const database = require("../database");
const { ObjectId } = require('mongodb');

module.exports = async (req, res, col) => {
    await client.connect();
    try {
        const db = client.db(database);
        const collection = db.collection(col);

        const id = req.params?.id;

        if (!id) {
            return res.status(400).send({ message: "ID não fornecido" });
        }

        const uid = new ObjectId(id);

        const aluno = await collection.findOne({ _id: uid });

        if (!aluno) {
            return res.status(404).send({ message: "Recurso não encontrado" });
        }

        // Atualizando o aluno com os dados do req.body
        await collection.updateOne({ _id: uid }, { $set: req.body });

        // Recuperando o aluno atualizado
        const alunoAtualizado = await collection.findOne({ _id: uid });

        res.send(alunoAtualizado);
    } catch (e) {
        console.error(e);

        // Tratando erros de maneira mais genérica
        return res.status(400).send({ message: "Ocorreu um erro durante a atualização do aluno" });
    } finally {
        await client.close();
    }
};
