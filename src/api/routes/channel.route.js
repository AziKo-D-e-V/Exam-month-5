const { Router } = require("express");
const { createChannel } = require("../controllers/channels.controller");

const router = Router();

router.post('/channel', createChannel )

module.exports = router;
