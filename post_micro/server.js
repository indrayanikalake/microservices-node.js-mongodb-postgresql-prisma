import express from "express";
import cors from  "cors";
import Routes from './routes/index.js'
const app =  express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());


app.get( "/", (req, res) => {
    res.send("It's running.......");
    res.json({message:"It's a  result"});
})

app.use(Routes);

app.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
})

