var express = require("express");
var router = express.Router();
var sequelize = require("../config/dbconnection");
const CategoryController = require("../controllers/CategoryController");
const appkeyMiddleware = require("../middleware/appKey");
const responeMiddleware = require("../middleware/respone");
const AuthMiddleware = require("../middleware/authentikasi");

router.use(appkeyMiddleware);
router.post("/",AuthMiddleware,CategoryController.createCategory)
router.put("/:id",AuthMiddleware,CategoryController.UpdateCategory)
router.use(responeMiddleware);


module.exports = router;
