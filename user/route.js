const userRouter = require("express").Router();
const userController = require("./controller");

userRouter.post("/create", async (req, res) => {
  try {
    const user = await userController.createUser(req);
    
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = userRouter;
