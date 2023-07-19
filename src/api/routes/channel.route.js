const { Router } = require("express");
const { createChannel, getChannels, forSubs } = require("../controllers/channels.controller");

const router = Router();

router.post('/channel', createChannel )
router.get('/channel', getChannels )
router.post('/channel/subs', forSubs)


module.exports = router;
