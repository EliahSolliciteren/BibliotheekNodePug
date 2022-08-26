const router = require("express").Router(),
boekenController = require("../controllers/boekenController")

router.get('/:id/binnenbrengen', boekenController.binnenbrengen)
router.get('/create', boekenController.createGet)
router.post('/create',boekenController.validatie,boekenController.validatie2, boekenController.createPost, boekenController.redirectView)
router.get('/', boekenController.overzicht)
router.get('/:id/boek', boekenController.details)
router.delete('/:id/delete', boekenController.delete, boekenController.redirectView)
router.get('/:id/lenen', boekenController.lenen)




module.exports=router