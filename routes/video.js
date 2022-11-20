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

    // console.log(req.body)

    // const newVideo = req.body;
    const {title, description} = req.body;

    // newVideo.id = uuidv4();
    // newVideo.image = '../public/images/Upload-video-preview.jpg' 

    const newVideo = {
        id: uuidv4(),
        title,
        description,
        channel: 'BrainStation',
        image: 'http://localhost:8080/uploadphoto',
        views: "7,837,092,284",
        likes: "7,837,092,284",
        duration: "1:00",
        timestamp: 1632344461000,
        comments: [
            {
                id: "2d818087-c1f4-4ec2-bcdc-b545fd6ec258",
                name: "Martin Evergreen",
                comment: "I’ve loved trains ever since I was a child. I dreamed about riding one around the world. This is the most fantastic thing I’ve seen yet, and I’m watching it ON a train!",
                likes: 3,
                timestamp: 1632512763000
            },
            {
                id: "191de346-b3c2-47b4-bf5b-6db90d1e3bdc",
                name: "Emily Harper",
                comment: "Let’s collaborate on a video for saving money on cheap train tickets! I’ll have my associates contact yours.",
                likes: 0,
                timestamp: 1632496261000
            }
        ]
    };

    const videosJSON = fs.readFileSync("./data/videos.json");
    const videos = JSON.parse(videosJSON);
    console.log(videos)

  
    videos.push(newVideo);
    fs.writeFileSync('./data/videos.json', JSON.stringify(videos));

    res.json(newVideo);


});


router.get("/videos/:videoId", (req, res) => {

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
