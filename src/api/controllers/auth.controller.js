const User  = require("../models/users.schema");
const bcrypt = require("bcrypt");
const jwt = require("../../libs/jwt");
const { generateHash, compareHash } = require("../../libs/bcrypt");

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const findUser = await User.find({ username });

    const compare = await compareHash(password, findUser[0].password);

    if (!compare) {
      return res.redirect("/login");
    }
    const token = jwt.sign({ userId: findUser.id });

    res.cookie("token", token);

    res.status(201).json({message: "Login successful", token: token})
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { name, username, password } = req.body;
    
    const findUser = await User.find({ username: username });

    
    const generate = await generateHash(password);

    const user = new User({ name, username, password: generate });

    if (findUser.length) {
      return res.status(404).json({ message: "User already exicts" });
    }

    const token = jwt.sign({ userId: findUser.id });

    res.cookie("token", token);

    await user.save();

    res.status(201).json({ message: "User added", data: user , token: token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  register,
};
