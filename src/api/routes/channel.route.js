const { Router } = require("express");
const { createChannel, getChannels } = require("../controllers/channels.controller");

const router = Router();

router.post('/channel', createChannel )
router.get('/channel', getChannels )


module.exports = router;
