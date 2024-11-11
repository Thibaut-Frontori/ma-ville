const erreur={
    page404(req, res){
        res.status(404).render("404");
    }
}
export default erreur;