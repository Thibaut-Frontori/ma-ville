import fs from "fs";
import pg from "pg";
import "dotenv/config";


const { Client } = pg;
const client= new Client({
    connectionString:process.env.PG_CONNECT
});

async function insertVille() {
    try {
        await client.connect();
        const data =JSON.parse(fs.readFileSync('./app/models/cities.json','utf8'));
        console.log(data.cities[0]);

        for (const city of data.cities) {
            const query= `INSERT INTO cities(
            insee_code,
            city_code,
            zip_code,
            label,
            latitude,
            longitude,
            department_name,
            department_number,
            region_name,
            region_geojson_name)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            ON CONFLICT(insee_code) DO NOTHING;
            `;
            
            const values=[
            city.insee_code,
            city.city_code,
            city.zip_code,
            city.label,
            city.latitude,
            city.longitude,
            city.department_name,
            city.department_number,
            city.region_name,
            city.region_geojson_name
            ];

            await client.query(query,values); 
        }

        
    } catch (error) {
        console.error("Erreur lors de l'insertion des données :", error);
    }
}


async function insertDepartement(){
    try {
        await client.connect();
        console.log("super on est connecté");
        const data = JSON.parse(fs.readFileSync("./app/models/departements.json","utf8"));

        for (const dep of data) {
            const query=`
            INSERT INTO departement(num_dep, dep_name, region_name) 
            VALUES ($1, $2, $3)
            ON CONFLICT ("num_dep") DO NOTHING;
            `;
            const values=[dep.num_dep, dep.dep_name, dep.region_name]; 
            
            await client.query(query, values);
            console.log(" Données intégrées avec succès");
        }
        
        
    } catch (error) {
        console.log("erreur lors de la connection");
    
        
    }
}