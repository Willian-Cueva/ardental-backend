const express = require("express");
const router = express.Router();

router.get("/all", (req,res)=>{
    res.send("jejeje todo del puctas hasta mientras")
})

module.exports = router;