const conn = require("../models/connection");
const channelsSchema = require("../models/channels.schema");
const usersSchema = require("../models/users.schema");
const subscripSchema = require("../models/subscrip.schema");
const followersSchema = require("../models/followers.schema");

const usersSubscrip = async (req, res) => {
  const { channel_id, user_id, month, payValue } = req.body;

  const session = await conn.startSession();

  const userBalance = await usersSchema.findById(user_id);
  const checkChannel = await subscripSchema.find({ channel_id: channel_id });
  const checkUserFollow = await followersSchema.find({channel_id: channel_id}) 
  if(!checkUserFollow){
    const costMonth = checkChannel.some((data) => data.month === month && data.cost === payValue );
  
    const channelBalance = await channelsSchema.findById(channel_id);
    const channelAdmin = await channelBalance.admin_id;
    const admin_id = await usersSchema.findById(channelAdmin);
  
    if (payValue === undefined) {
      res
        .status(404)
        .json({ message: "Please provide a value for the channel payment" });
  
      if (userBalance.balance > payValue || payValue < 0) {
        return res.status(404).json({ message: "not enough funds" });
      }
    } else if (costMonth) {
  
      userBalance.status = "active";
  
  
      userBalance.expirationDate = new Date(new Date().getTime() + month * 30 * 24 * 60 * 60 * 1000);
  
      userBalance.balance = userBalance.balance - payValue;
      admin_id.balance = admin_id.balance + payValue;
  
        const newFollower = new followersSchema({startDate: new Date(), endDate: userBalance.expirationDate, user_id, channel_id,status:userBalance.status, pay: payValue, month })
  
      await session.withTransaction(async () => {
        await userBalance.save();
        await newFollower.save();
        await admin_id.save();
      });
  
      session.endSession();
  
      return res.json({ message: "Successfully payed and subscriped this channel" });
      
    }
  }else{
    res.status(402).json({message: "Your account is already following this channel"})
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

const userStatus = async (req, res) => {
  const {id} = req.params

  const user = await followersSchema.find({user_id: id});
  if (user) {
    const channelId = user[0].channel_id
    const channel = await followersSchema.find({channel_id: channelId});
    const channelName = await channelsSchema.find({_id: channelId});
    return res.status(200).json({
      message: `User status: ${user[0]?.status ? user[0].status : "deactive"}`,ChannelName: channelName[0].name, Channel: channel.length ? channel : "Not found",
    });

  }
  else{
    res.status(404).json({message: "Not followed channels"})
  }
  
}


module.exports = { usersSubscrip, userBalancePay, userStatus };
