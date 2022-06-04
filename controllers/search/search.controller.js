
const searchItems = async (req,res,next)=>{
    res.send(req.query);
}

module.exports = searchItems;