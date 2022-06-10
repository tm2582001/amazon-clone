const catchError = (err,req,res,next)=>{
    const {statusCode = 500} = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong";
    // mongoose error doesn't show using .json(err);
    res.status(statusCode).json({stack:err.stack,message:err.message});
}

module.exports = catchError;