import User from "../models/userModel.js";

export const createUser = async (req, res, next) => {
  const { name, email, avatar } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({
        message: "User exists",
      });
    }

    const newUser = await User.create({ name, email, avatar });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getUser = async (req, res, next) => {};
