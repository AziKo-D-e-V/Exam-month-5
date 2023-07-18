const { generateHash } = require("../../libs/bcrypt");
const channelsSchema = require("../models/channels.schema");

const createChannel = async (req, res) => {
  console.log(req.body);
  try {
    const { name, username, admin_id } = req.body;

    const findChannel = await channelsSchema.find({ username: username });


    if (findChannel.length) {
        return res.status(404).json({ message: "Username already registered" });
    }
    
    
    const channel = new channelsSchema({ name, username, admin_id});

    await channel.save();

    res.status(201).json({ message: "Congratulation! Channel registered", data: channel });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createChannel };
