const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");


router.get("/videos", (req, res) => {
    res.send([])
})

module.exports = router;
