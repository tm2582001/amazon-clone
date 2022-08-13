const ExpressError = require("../../utils/express-error/express-error.util");

const pageNotFound = (req,res)=>{
    throw new ExpressError('Page Not found',404);
}

module.exports = pageNotFound;