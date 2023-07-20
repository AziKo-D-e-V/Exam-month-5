const { Router } = require("express");
const { createChannel, getChannels, forSubs, channelFollower } = require("../controllers/channels.controller");
const isActive = require("../middlewares/isActive");

const router = Router();

router.post('/channel', createChannel ) // create a channel
router.get('/channel', getChannels ) // get all channels
router.post('/channel/subs', forSubs) // pay to the channel subscription
router.post('/channel/admin', channelFollower) //admin looking followers


module.exports = router;
