const reviewsController = require("../controllers/reviewsController")
const review = require("../models/review")

const router = require("express").Router(),
reviewController = require("../controllers/reviewsController")



router.get('/create', reviewController.createGet)
router.post('/create',reviewController.validatie,reviewController.validatie2 , reviewController.createPost)
router.get('/',reviewController.overzicht )
router.get('/:id?/edit',reviewController.editGet )

router.put('/:id/edit',reviewController.editPost, reviewController.redirectView)
//router.delete('/delete', reviewController.delete)
router.get('/:id/zoeken', reviewController.reviewZoeken)
router.delete('/:id/delete', reviewController.delete, reviewController.redirectView)




module.exports=router