import express from 'express';
import mainControleur from '../controllers/main.js';
import erreur from '../controllers/erreur.js';

const router = express.Router();

router.get('/', mainControleur.accueil);
router.get('/departements', mainControleur.departement);
router.get('/departement/:id',mainControleur.villeDuDep);




router.get('*', erreur.page404);


export default router;
