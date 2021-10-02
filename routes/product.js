var express = require("express");
var router = express.Router();
var sequelize = require("../config/dbconnection");
const CategoryController = require("../controllers/CategoryController");
const ProductController=require("../controllers/ProductController")
const appkeyMiddleware = require("../middleware/appKey");
const responeMiddleware = require("../middleware/respone");
const AuthMiddleware = require("../middleware/authentikasi");

router.use(appkeyMiddleware);
router.post("/", AuthMiddleware([3]), ProductController.createProduct);
// router.put("/:id", AuthMiddleware, CategoryController.UpdateCategory);
// router.delete("/:id", AuthMiddleware, CategoryController.DeleteCategory);
// router.get("/", AuthMiddleware, CategoryController.FindAllCategory);
// router.get("/:id", AuthMiddleware, CategoryController.FindOneCategory);
router.use(responeMiddleware);

module.exports = router;
