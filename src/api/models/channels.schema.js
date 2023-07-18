const { Schema, model, mongoose } = require("mongoose");

const Channel = new Schema(
  {
    name:{
      type: String,
      required: true
    },
    username: {
      type: String, 
      required: true,
      min: 3,
    },
    balance: {
      type: Number,
      default: 0,
    },
    admin_id: {
        type: mongoose.Types.ObjectId,
        ref:'Users'
    },

  }
);


module.exports = model("Channel", Channel)
