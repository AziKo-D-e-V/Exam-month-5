const { Router } = require("express");
const {  userBalancePay, usersSubscrip } = require("../controllers/users.controller");

const router = Router();

router.post('/account', userBalancePay )
router.put('/account', usersSubscrip )

module.exports = router;
