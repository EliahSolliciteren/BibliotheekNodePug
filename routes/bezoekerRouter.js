
const router = require("express").Router(),
bezoekersController = require("../controllers/bezoekersController")




router.get('/registreren', bezoekersController.nieuweAccount)
router.post('/registreren', bezoekersController.registreren)
router.get('/',bezoekersController.overzicht)
//router.get('/:id?/details', bezoekersController.details)
router.get('/aanmelden', bezoekersController.authentificatieGet)
router.post('/aanmelden', bezoekersController.authentificatiePost)
router.get('/afmelden', bezoekersController.afmelden)
router.get('/:id/updaten', bezoekersController.updateGet)
router.put('/:id/updaten', bezoekersController.updatePost)
router.delete('/:id/delete', bezoekersController.delete, bezoekersController.redirectView)



































module.exports= router;