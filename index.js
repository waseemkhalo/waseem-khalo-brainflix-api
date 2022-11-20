const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const videosRoute = require("./routes/video");



app.get("/",(request, response)=>{
    response.send("please enter a path, hint: /videos");
});

app.use(cors());

app.use(express.json());

app.use("/uploadphoto", express.static("./public/images/Upload-video-preview.jpg"));

app.use("/", videosRoute);



app.listen(process.env.PORT,()=>{ 
    console.log(`Server listening on port ${process.env.PORT}!`);
});