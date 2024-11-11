import client from "./database.js";

const dataMapper={
    async villeParDepartement(numero) {  
        const result = await client.query(`SELECT label FROM cities WHERE department_number=$1 ORDER BY label`, [numero.toString()]);    
        return result.rows; 
    }, 
    async departementListe(){
        const result = await client.query("SELECT * FROM departement ORDER BY num_dep");
        return result.rows;
    }
}

export default dataMapper;

