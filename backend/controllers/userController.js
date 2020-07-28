const { User } = require("../sequelize");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  let { email, password } = req.body;

  if (!email) throw "Email is missing";
  if (!password) throw "Password is missing";

  let userExists = await User.findAll({
    raw: true,
    where: { email: email },
  });

  console.log(userExists);

  if (userExists && bcrypt.compareSync(password, userExists[0].password)) {
    res
      .json({
        message: "Login Successful",
        state: 1,
        userId: userExists[0].id,
        username: userExists[0].name,
      })
      .status(200);
  } else {
    res
      .json({
        message: "Login Failed",
        state: 0,
      })
      .status(401);
  }
};

exports.register = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name) throw "Name is missing";
  if (!email) throw "Email is missing";
  if (!password) throw "Password is missing";

  let userExists = await User.findAll({
    where: { email: email },
  });

  console.log(userExists);

  if (userExists.length > 0) throw "Email already in use";

  await User.create({ name: name, email: email, password: password });
  //create new user

  res.status(200).json({
    message: "User created successfully",
    state: 1,
  });
};
