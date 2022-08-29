const reviewsController = require("../controllers/reviewsController")
const review = require("../models/review")

const router = require("express").Router(),
reviewController = require("../controllers/reviewsController")



router.get('/create', reviewController.createGet)
router.post('/create', reviewController.createPost)
router.get('/',reviewController.overzicht )
router.get('/edit',reviewController.editGet )
router.put('/:id/edit',reviewController.editPost, reviewController.redirectView)
router.get('/reviews',reviewController.reviewsVoorBoek )
router.delete('/delete', reviewController.delete)
router.get('/:id/zoeken', reviewController.reviewZoeken)





module.exports=router