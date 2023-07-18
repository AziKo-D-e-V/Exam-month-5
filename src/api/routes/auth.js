const { Router } = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/login", login);
router.post("/auth/register", register);

module.exports = router;
