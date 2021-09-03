var express = require('express');
var router = express.Router();
var sequelize=require('../config/dbconnection')
const UserController=require('../controllers/UserController')
const appkeyMiddleware=require('../middleware/appKey')
const responeMiddleware=require('../middleware/respone')


router.use(appkeyMiddleware)
router.post('/register',UserController.register)
router.use(responeMiddleware)


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
