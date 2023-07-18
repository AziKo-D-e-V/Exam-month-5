const conn = require("../models/connection");
const usersSchema = require("../models/users.schema");

const usersSubscrip = async (req, res) => {
  const { channel_username } = req.body;
};

const userBalancePay = async (req, res) => {
  try {
    const { user_id, sum } = req.body;

    const session = await conn.startSession();

    const userBalance = await usersSchema.findById(user_id);

    if (!userBalance) {
      return res.status(404).json({ message: "User not found" });
    }

    userBalance.balance += sum;

    await session.withTransaction(async () => {
      await userBalance.save();
    });

    session.endSession();
    res.status(201).json({ message: "User balance filled successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { usersSubscrip, userBalancePay };
