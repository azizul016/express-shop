const Shop = require('../models/Shop.model');

//add shop data
module.exports.create = (shop) => {
  return Shop.create(shop);
};

//get total shop data
module.exports.totalData = () => {
  return Shop.find();
};

//get single shop data
module.exports.getById = (updateId) => {
  return Shop.findById(updateId);
};

//update shop data
module.exports.updateShopData = (updateId, updateField, validators) => {
  return Shop.findOneAndUpdate(updateId, updateField, validators);
};

//delete shop services
module.exports.deleteSingleShopData = (shop) => {
  return Shop.findOneAndDelete(shop);
};
