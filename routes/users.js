var express = require("express");
var router = express.Router();
var sequelize = require("../config/dbconnection");
const UserController = require("../controllers/UserController");
const appkeyMiddleware = require("../middleware/appKey");
const responeMiddleware = require("../middleware/respone");
const AuthMiddleware = require("../middleware/authentikasi");

router.use(appkeyMiddleware);
// router.post("/checkout",AuthMiddleware.validasiToken2([4]),UserController.dummyAuth)
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/dummyAuth", AuthMiddleware([1,4]), UserController.dummyAuth);//super admin ekslusif
// router.get("/dummyAuth", AuthMiddleware([1,2]), UserController.dummyAuth)
router.use(responeMiddleware);

/* GET users listing. */
// router.get('/', async function(req, res, next) {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

//   res.send('respond with a resource');
// });

module.exports = router;
