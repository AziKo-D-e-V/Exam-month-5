const followersSchema = require("../models/followers.schema");

const isActive = async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkFollow = await followersSchema.find({user_id: id});
    if (!checkFollow || checkFollow.status === "deactivate") {
      res.status(403).json({ message: "User not followed" });
    } else {
      const date = new Date();

      if (checkFollow.endDate > date) {
        await followersSchema.findByIdAndUpdate(
          id,
          { status: "deactivate" },
          (err) => {
            console.log(err.message);
          }
        );
        res
          .status(403)
          .json({ message: "Time is Up! You have to pay! You blocked" });
      } else {
        next();
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = isActive;
