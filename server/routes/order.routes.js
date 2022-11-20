const { Router } = require("express");
const orderController = require("../controllers/order.controller");
const router = Router();

router.get("/get-order/:id", orderController.get_orders);
router.post("/order", orderController.checkout);

module.exports = router;
