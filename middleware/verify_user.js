const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try {
        //const token = req.headers.authorization;
        const token = req.headers.cookie.split("token=")[1];
        console.log(" authenticating ....." + token);
        const verifiedToken = jwt.verify(token, process.env.SECRET);
        console.log(" verified token ....." + JSON.stringify(verifiedToken));
        req.userData = verifiedToken;
        next();
    } catch (e) {
        console.log(" authenticating else....." + JSON.stringify(req.headers.authorization));
        /*return res.status(401).json({
            message : "Invalid or expire token",
            error: e
        });*/
        res.redirect('/userlogin');
    }
}

module.exports = {
    userAuth
};
