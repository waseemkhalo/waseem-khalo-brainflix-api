const app = require('express')();
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const videosRoute = require("./routes/video");

app.use(cors());


app.get("/",(request, response)=>{
    response.send("please enter a path");
});

app.use("/", videosRoute);



app.listen(process.env.PORT,()=>{ 
    console.log(`Server listening on port ${process.env.PORT}!`);
});