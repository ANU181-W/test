const bcrypt = require("bcrypt");
const User = require("./model");
const saltRounds = 10; // Adjust salt rounds as needed

const saveUser = async (usersInp) => {
  try {
    const usersInput = usersInp;

    // Check if email already exists
    const existingUser = await User.findOne({
      where: { email: usersInput.email },
    });
    if (!existingUser) {
      // Hash password
      const password = usersInput.password || "";
      const encryptedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const newUser = {
        ...usersInput,
        password: encryptedPassword,
      };

      // Save user to the database
      const user = await User.create(newUser);

      return user;
    }

    return "email exists";
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = { saveUser };
