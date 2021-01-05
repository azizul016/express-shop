const shopService = require("../services/shop.service");

//add data
module.exports.create = async (req, res, next) => {
  try {
    const shop = await shopService.create(req.body);
    return res.status(200).send(shop);
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

//get all data
module.exports.getAll = async (req, res, next) => {
  try {
    const shop = await shopService.totalData();
    res.send(shop);
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

//get single data;
module.exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleShop = await shopService.getById(id);
    res.send(singleShop);
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports.updateById = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  const updateField = req.body;
  try {
    const shop = await shopService.updateShopData({ _id: id }, updateField, {
      new: true,
      runValidators: true,
    });
    return res.status(200).send(shop);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// delete singleShop data

module.exports.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteShopData = await shopService.deleteSingleShopData({ _id: id });
    res.send(deleteShopData);
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};
