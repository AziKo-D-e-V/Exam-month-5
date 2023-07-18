const conn = require("../models/connection");
const channelsSchema = require("../models/channels.schema");
const usersSchema = require("../models/users.schema");

const usersSubscrip = async (req, res) => {
  const { channel_id, user_id, payValue } = req.body;

    const session = await conn.startSession();

  const userBalance = await usersSchema.findById(user_id);

  const channelBalance = await channelsSchema.findById(channel_id);
  const channelAdmin = await channelBalance.admin_id;
  const admin_id = await usersSchema.findById(channelAdmin);
  let duration;

  if (payValue === undefined) {
    response
      .status(404)
      .json({ message: "Please provide a value for the channel payment" });
  } else if (payValue === 100) {
    duration = "1";
    userBalance.status = "active";
    userBalance.expirationDate = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    ); // Bir oydan keyin

    userBalance.balance = userBalance.balance - payValue;
    admin_id.balance = admin_id.balance + payValue;

    await session.withTransaction(async () => {
      await userBalance.save();
      await admin_id.save();
    });




    session.endSession();

return res.json({message: "success", duration: duration})


  } else if (payValue === 500) {
    duration = "6";
    user.status = "active";
    user.expirationDate = new Date(
      new Date().getTime() + 6 * 30 * 24 * 60 * 60 * 1000
    ); // Olti oydan keyin
  } else if (payValue === 1000) {
    duration = "12";
    user.status = "active";
    user.expirationDate = new Date(
      new Date().getTime() + 12 * 30 * 24 * 60 * 60 * 1000
    ); // Bir yildan keyin
  }
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
