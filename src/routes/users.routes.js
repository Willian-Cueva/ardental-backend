const express = require("express");
const adminAccess = require("../admin");
const { login, register, getAllUsers, tooglePermitions, resquePassword, changePassword, getUser, putUser, changePass } = require("../controllers/users.controller");
const ensureToken = require("../token");
const router = express.Router()

router.put("/update-user",ensureToken,putUser);
router.get("/get-user/:email",ensureToken,getUser);

router.put("/change-pass",ensureToken,changePass);

router.put("/change-password",changePassword)

router.post("/resque-password",resquePassword)

router.post("/toggle-permition",ensureToken,adminAccess,tooglePermitions);

router.get("/all-users",ensureToken,getAllUsers);

router.post("/login",login);

router.post("/register",register);

module.exports = router;