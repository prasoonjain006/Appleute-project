const Cart = require("../models/cart");
const Product = require("../models/products");

module.exports.get_cart_items = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

//To select and add multiple products to cart at once
module.exports.add_multiple_products = async (req, res) => {
  const userId = req.body.userId;
  const products = req.body.products;

  try {
    let cart = await Cart.findOne({ userId });
    let ids = [];
    products.forEach((element) => {
      ids.push(element.productId);
    });
    let items = await Product.find({ _id: { $in: ids } });

    if (cart) {
      let price = 0;
      items.forEach((item, ind) => {
        price = price + item.price;
        const name = item.title;
        const productId = item._id;
        let itemIndex = cart.items.findIndex((p) => p.productId == productId);
        let quantity = cart.items[itemIndex].quantity + 1;

        // Check if product exists or not
        if (itemIndex > -1) {
          let productItem = cart.items[itemIndex];
          productItem.quantity += 1;
          cart.items[itemIndex] = productItem;
        } else {
          cart.items.push({ productId, name, quantity, price });
        }
      });
      cart.bill += price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      let newProdArray = [];
      let totalAmount = 0;
      items.forEach((it, ind) => {
        let newItem = {
          productId: it._id.toHexString(),
          name: it.name,
          price: it.price,
          quantity: 1,
        };
        totalAmount = totalAmount + it.price;
        newProdArray.push(newItem);
      });
      const newCart = await Cart.create({
        userId,
        items: newProdArray,
        bill: totalAmount,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.add_cart_item = async (req, res) => {
  const userId = req.body.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      res.status(404).send("Item not found!");
    }
    console.log(item);
    const price = item.price;
    const name = item.title;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.delete_item = async (req, res) => {
  const userId = req.body.id;
  const productId = req.body.productId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    console.log(itemIndex);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
