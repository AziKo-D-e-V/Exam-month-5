const { Router } = require("express");
const {  userBalancePay, usersSubscrip, userStatus } = require("../controllers/users.controller");
const isActive = require("../middlewares/isActive");
const { forSubs } = require("../controllers/channels.controller");

const router = Router();

router.post('/account', userBalancePay ) //o'ziga tolov qilish
router.put('/account', usersSubscrip ) // user pay to channel
router.get('/account/:id', isActive, userStatus) // user show status 

module.exports = router;
