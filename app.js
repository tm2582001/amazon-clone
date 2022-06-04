const express = require("express");
const path = require('path');
const app = express();

const searchItemsRoute = require('./routes/search/search.routes');

const catchError = require('./middleware/catch-error/cath-error.middleware');

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('pages/home')
});

app.use('/search',searchItemsRoute);

app.use(catchError);

const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
});