const Product = require("../models/products");

module.exports.get_items = (req, res) => {
  Product.find().then((items) => res.json(items));
};

module.exports.post_item = (req, res) => {
  const newItem = new Product(req.body);

  Product.findOne({ name: newItem.name, category: newItem.category }).then(
    (item) => {
      console.log(item);
      if (!item) {
        newItem.save().then((item) => res.json(item));
      } else {
        res.send("Product with same name and category already exists");
        return;
      }
    }
  );
};

module.exports.update_item = (req, res) => {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
    item
  ) {
    Product.findOne({ _id: req.params.id }).then(function (item) {
      res.json(item);
    });
  });
};

module.exports.delete_item = (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};
