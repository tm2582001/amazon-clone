const home = (req,res)=>{
    const cat = req.app.locals.cat;
    res.render('pages/home',{cat});
}

module.exports = home;