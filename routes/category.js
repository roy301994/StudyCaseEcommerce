var express = require("express");
var router = express.Router();
var sequelize = require("../config/dbconnection");
const CategoryController = require("../controllers/CategoryController");
const appkeyMiddleware = require("../middleware/appKey");
const responeMiddleware = require("../middleware/respone");
const AuthMiddleware = require("../middleware/authentikasi");

router.use(appkeyMiddleware);
router.post("/", AuthMiddleware([3]), CategoryController.createCategory);
router.put("/:id", AuthMiddleware([3]), CategoryController.UpdateCategory);
router.delete("/:id", AuthMiddleware([3]), CategoryController.DeleteCategory);
router.get("/", AuthMiddleware([3]), CategoryController.FindAllCategory);
router.get("/:id", AuthMiddleware([3]), CategoryController.FindOneCategory);
router.use(responeMiddleware);

module.exports = router;
