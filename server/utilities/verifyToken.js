import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(403).json('You are not authorized! Please Login!');
    jwt.verify(token, process.env.jwt, (err, user) => {
        if (err) return res.json('token is invalid!');
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json('You are not authorized! Please Login!!!')
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,() => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.json('You are not authorized!!')
        }
    })
}