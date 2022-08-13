const pageNotFoundApi = (req,res)=>{
    res.status(404).send({error:'Page Not Found'});
}

module.exports = pageNotFoundApi;