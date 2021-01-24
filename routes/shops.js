const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller');
// const userController = require("../middlewares/middlewares");
const { shopValidator } = require('../middlewares/shop.validetor');
const { checkInvalid } = require('../middlewares/validationResult');

/* GET users listing. */
router.post('/', shopValidator, checkInvalid, shopController.create);
router.get('/', shopController.getAll);
router.get('/:id', shopController.getById);
router.put('/:id', shopController.updateById);
router.delete('/:id', shopController.deleteById);
// /* GET users listing. */
// router.post("/",userController.isAuthenticated, shopController.create);
// router.get("/", shopController.getAll);
// router.get("/:id", shopController.getById);
// router.put("/:id",userController.isAuthenticated, shopController.updateById);
// router.delete("/:id",userController.isAuthenticated, shopController.deleteById);

module.exports = router;
