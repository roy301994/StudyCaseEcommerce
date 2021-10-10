var express = require("express");
var router = express.Router();
var sequelize = require("../config/dbconnection");
const CartController = require("../controllers/CartController");
const appkeyMiddleware = require("../middleware/appKey");
const responeMiddleware = require("../middleware/respone");
const AuthMiddleware = require("../middleware/authentikasi");
const CategoryController = require("../controllers/CategoryController");

router.use(appkeyMiddleware);
router.post("/", AuthMiddleware([3,4]),CartController.createCart);
router.put("/:id", AuthMiddleware([3]), CartController.UpdateCart);
router.delete("/:id", AuthMiddleware([3]), CartController.DeleteCart);
// router.get("/", AuthMiddleware([3]), CartController.FindAllCategory);
// router.get("/:id", AuthMiddleware([3]), CartController.FindOneCategory);
router.use(responeMiddleware);

module.exports = router;


