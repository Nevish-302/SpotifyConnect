const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const config = process.env;

const verifyToken = async (req, res, next) => {
  //bearer token
    //req.cookie['auth'].token || req.query.token || req.headers["x-access-token"];
  //  console.log(req.cookies)
  //const { auth } = await req.cookies;
  //console.log(auth, req.cookies, 'auth token');
 //const token = auth
 const token = req.headers.authorization.split(" ")[1]
 console.log(req.headers, req.headers.authorization)
 if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  //try {
    const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log(token, 'token');
    console.log(decoded, 'decoded user');
    const user = await User.find({_id : decoded.user_id})
    req.user = decoded;
    console.log('Hello', req.user)
  //} catch (err) {
  //  console.log(err)
  //  return res.status(401).send("Invalid Token");
  //}
  return next();
};

module.exports = verifyToken 