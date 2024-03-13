const express = require("express");
const { userRegister, logoutUser, userLogin } = require("../controller/user.controller");
const router = express();

router.route("/user/register").post(userRegister);

router.route("/user/login").post(userLogin);

router.route("/user/logout").get(logoutUser);

module.exports = router;
