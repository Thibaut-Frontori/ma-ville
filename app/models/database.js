import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
console.log("PORT:", process.env.PORT);

const {Client} = pg;

const client = new Client ({
    connectionString:process.env.PG_CONNECT,
});

async function createDataBase() {
    try {
        console.log('Tentative de connexion à la base de données...');
        await client.connect();
        console.log('Connexion réussie.');

        const dbName = process.env.DB_NAME;
        console.log(`Vérification de l'existence de la base de données "${dbName}"...`);

        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);

        if (res.rowCount === 0) {
            console.log(`La base de données "${dbName}" n'existe pas. Création en cours...`);
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`Base de données "${dbName}" créée avec succès.`);
        } else {
            console.log(`La base de données "${dbName}" existe déjà.`);
        }
    } catch (error) {
        console.error('Erreur lors de la création de la base de données :', error);
    }
}

createDataBase();

export default client; 


