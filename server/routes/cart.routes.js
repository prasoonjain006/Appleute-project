const { Router } = require("express");
const cartController = require("../controllers/cart.controllers");
const router = Router();

router.get("/cart/:id", cartController.get_cart_items);
router.post("/cart", cartController.add_cart_item);
router.post("/cart-multiple", cartController.add_multiple_products);
router.delete("/cart/delete", cartController.delete_item);

module.exports = router;
