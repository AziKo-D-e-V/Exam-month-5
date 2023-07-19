const { generateHash } = require("../../libs/bcrypt");
const channelsSchema = require("../models/channels.schema");
const subscripSchema = require("../models/subscrip.schema");
const channelAdminSubs = require("../models/subscrip.schema");

const createChannel = async (req, res) => {
  console.log(req.body);
  try {
    const { name, username, admin_id } = req.body;

    const findChannel = await channelsSchema.find({ username: username });

    if (findChannel.length) {
      return res.status(404).json({ message: "Username already registered" });
    }

    const channel = new channelsSchema({ name, username, admin_id });

    await channel.save();

    res
      .status(201)
      .json({ message: "Congratulation! Channel registered", data: channel });
  } catch (error) {
    console.log(error);
  }
};

const getChannels = async (req, res) => {
  const chan = await channelsSchema.find();

  res.status(201).json({ message: "All channels", data: chan });
};

const forSubs = async (req, res) => {
  const { channel_id, user_id, month, cost } = req.body;

  const channel = await channelsSchema.findById(channel_id);
  const foundChannelValue = await subscripSchema.find({channel_id: channel.id});
  const channeladminID = channel.admin_id;
  const channelName = channel.name;
  
  const values = foundChannelValue.some((value) => value.month === month && value.cost === cost);
  
  
  if (channeladminID != user_id) {
    if (values) return res.status(404).json({ message: "Month allready registered" });
    res.status(403).json({ message: "Not access" });
  } else {
    await subscripSchema.create({
      channel_id,
      channel_name: channelName,
      user_id,
      month,
      cost,
    });

  res.status(201).json({ message: "Success", channel: channelName });
  }
};

module.exports = { createChannel, getChannels, forSubs }
