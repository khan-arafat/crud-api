const errorHandler = (err, req, res, next)=>{
    var statusCode  = res.statusCode || 500;

    switch(statusCode){
        case 400:
            res.json({
                title: "Validation failed", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case 404:
            res.json({
                title: "Not Found", 
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case 403:
            res.json({
                title: "Forbidden", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        case 500:
            res.json({
                title: "Server Error", 
                message: err.message, 
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No Error all good");
            break;
    }
}

module.exports = errorHandler