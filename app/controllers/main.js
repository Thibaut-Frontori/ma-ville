import dataMapper from "../models/dataMapper.js";

const mainControleur={
    accueil(req, res){
        res.render("index");
    },
    async departement(req,res){
        const listeDep= await dataMapper.departementListe();
        res.render("departements", {listeDep});       
    },
    async villeDuDep(req, res){
        const depId = req.params.id;
        const listeDesvilles= await dataMapper.villeParDepartement(depId);
        console.log(listeDesvilles);
        
        res.render("ville",{listeDesvilles});
    }
};
export default mainControleur;