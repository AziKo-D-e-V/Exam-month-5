const { Schema, model, mongoose } = require("mongoose");

const Subs = new Schema(
  {
    channel_id: { 
        type: String,
        required: true,
    },
    subscrip_value:{

    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref:'Users'
    },

  }
);


module.exports = model("Channel", Subs)
