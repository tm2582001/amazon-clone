const catchAsync = (funct)=>{
    return (req,res,next)=>{
        funct(req,res,next).catch(next);
    }
}

module.exports = catchAsync;