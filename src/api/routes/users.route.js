const { Router } = require("express");
const {  userBalancePay } = require("../controllers/users.controller");

const router = Router();

router.post('/account', userBalancePay )

module.exports = router;
