const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const videosRoute = require("./routes/video");

app.use(cors());


app.get("/",(request, response)=>{
    response.send("please enter a path, hint: /videos");
});

app.use("/", videosRoute);

app.use(express.json());


app.listen(process.env.PORT,()=>{ 
    console.log(`Server listening on port ${process.env.PORT}!`);
});