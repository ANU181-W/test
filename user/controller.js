const userController = {};
const dbhelper = require("./dbHelper");
userController.createUser = async (req) => {
  try {
    const user = dbhelper.saveUser(req.body);
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
module.exports = userController;