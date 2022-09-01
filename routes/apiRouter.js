const { alleBoeken } = require("../controllers/apiController");
const { JSONerror } = require("../controllers/apiController");
const apiController = require("../controllers/apiController")

const router = require("express").Router();

router.get("/alleBoeken", apiController.alleBoeken, apiController.JSON)
router.use(apiController.JSONerror)

















module.exports= router;