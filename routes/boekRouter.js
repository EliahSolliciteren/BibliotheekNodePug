const router = require("express").Router(),
boekenController = require("../controllers/boekenController")

router.get('/create', boekenController.createGet)
router.post('/create',boekenController.validatie,boekenController.validatie2, boekenController.createPost, boekenController.redirectView)
router.get('/', boekenController.overzicht)
router.get('/:id/edit', boekenController.editGet)
router.put('/:id/edit', boekenController.editPost)
router.get('/zoeken', boekenController.zoeken, boekenController.zoeken2,boekenController.redirectView/* boekenController.zoeken3*/ )
//Staat bij reviews
//router.get('/:id/boek', boekenController.details)
router.delete('/:id/delete', boekenController.delete, boekenController.redirectView)
router.get('/:id/lenen', boekenController.lenen)
router.get('/:id/binnenbrengen', boekenController.binnenbrengen, boekenController.redirectView)
router.get('/:id/details', boekenController.reviewsVoorBoeken)



module.exports=router