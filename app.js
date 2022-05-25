const express = require("express");
const path = require('path');
const app = express();

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('home')
})


const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})