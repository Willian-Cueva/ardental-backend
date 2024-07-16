const express = require("express");
const adminAccess = require("../admin");
const { login, register, getAllUsers, tooglePermitions, resquePassword, changePassword, getUser, putUser, changePass } = require("../controllers/users.controller");
const ensureToken = require("../token");
const router = express.Router()

//implementado
router.put("/update-user",ensureToken,putUser);
//implementado
router.get("/get-user/:email",ensureToken,getUser);

router.put("/change-pass",ensureToken,changePass);
//implementado
router.put("/change-password",changePassword)
//implementado
router.post("/resque-password",resquePassword)
//implementado
router.post("/toggle-permition",ensureToken,adminAccess,tooglePermitions);
//implementado
router.get("/all-users",ensureToken,getAllUsers);
//implementado
router.post("/login",login);
//implementado
router.post("/register",register);

module.exports = router;