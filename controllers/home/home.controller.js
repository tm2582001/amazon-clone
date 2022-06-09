const home = (req,res)=>{
    const cat = req.app.locals.cat;
    console.log(cat.length);
    res.render('pages/home',{cat});
}

module.exports = home;