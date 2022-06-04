const catchError = (err,req,res,next)=>{
    const {statusCode = 500} = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong";
    res.status(statusCode).json(err);
}

module.exports = catchError;