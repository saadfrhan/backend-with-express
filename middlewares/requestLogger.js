module.exports.requestLogger = function(req, res, next) {
    console.log("Request recieved at " + new Date());
    console.log("Request endpoint is " + req.url)
    next();
}