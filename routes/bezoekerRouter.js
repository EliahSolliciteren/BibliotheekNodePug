const boekenController = require("../controllers/boekenController")

const router = require("express").Router(),
bezoekersController = require("../controllers/bezoekersController")




router.get('/registreren', bezoekersController.nieuweAccount)
router.post('/registreren',bezoekersController.validatie, bezoekersController.validatie2, bezoekersController.registreren)
router.get('/',bezoekersController.overzicht)
//router.get('/:id?/details', bezoekersController.details)
router.get('/aanmelden', bezoekersController.authentificatieGet)
router.post('/aanmelden', bezoekersController.authentificatiePost)
router.get('/afmelden', bezoekersController.afmelden, bezoekersController.redirectView)
router.get('/:id/edit', bezoekersController.updateGet)
router.put('/:id/edit', bezoekersController.validatie, bezoekersController.validatie2, bezoekersController.updatePost)
router.delete('/:id/delete', bezoekersController.delete, bezoekersController.redirectView)
router.get('/leenoverzicht', bezoekersController.leenoverzicht, bezoekersController.redirectView)


































module.exports= router;