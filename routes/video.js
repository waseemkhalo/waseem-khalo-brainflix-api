const { response } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");


router.get("/videos", (req, res) => {
    const videosJSON = fs.readFileSync('./data/videos.json')
    const videos = JSON.parse(videosJSON);
    

    const newVideoArray = videos.map((item) => {
        delete item.description;
        delete item.views;
        delete item.likes;
        delete item.duration;
        delete item.video;
        delete item.timestamp;
        delete item.comments;
        return item;
       });
    

    res.json(newVideoArray)

});

// adding a new video to JSON
router.post("/videos", (req, res) => {


    const video = req.body;


    video.id = uuidv4();

    const videosJSON = fs.readFileSync("./data/videos.json");

    let videos = JSON.parse(videosJSON);

    videos.push(video);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(video);



});


router.get("/videos/:videoId", (req, res) => {

    //req.params is an object with all URL params
    const id = req.params.videoId;
    const videosJSON = fs.readFileSync("./data/videos.json");
    const videos = JSON.parse(videosJSON);
    const video = videos.find(video => video.id === id);

    //dealing w/ invalid videoId - example http://localhost:8080/videos/004
    if (video === undefined) {
        return res.status(404).send(`Video ${id} was not found`);
    }
    res.json(video);
});
module.exports = router;
