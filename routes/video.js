const { response } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");


router.get("/videos", (req, res) => {
    const videosJSON = fs.readFileSync('../data/videos.json')
    const videos = JSON.parse(videosJSON);
    res.json(videos)

    console.log(videos)
})



router.get("/videos/:videoId",(req,res)=>{

    //req.params is an object with all URL params
    const id = req.params.videoId;
    const videosJSON = fs.readFileSync("../data/videos.json");
    const videos = JSON.parse(videosJSON);
    const video = videos.find( video=> video.id === id );

    //deal w/ bad student ID - http://localhost:8080/videos/004
    if(video === undefined){
        return res.status(404).send(`Video ${id} was not found`);
    }
    res.json(video);
});


module.exports = router;
