const jwt = require('jsonwebtoken');

async function authenticationMiddleware(req, res, next) {
  try {

   //1 const token =  req.headers.authorization;
   //1 const decoded = jwt.decode(token);
    
   
   // console.log("INPUT FIEL", req.body.payload)
   // console.log("SHORTLIVEDTOKEN", decoded.shortLivedToken)
    
    
    let { authorization } = req.headers;
    if (!authorization && req.query) {
      authorization = req.query.token;
      console.log(authorization)
    }
    const { accountId, userId, backToUrl, shortLivedToken } = jwt.verify(
      authorization,
     process.env.MONDAY_SIGNING_SECRET
    );
  
    req.session = { accountId, userId, backToUrl, shortLivedToken };
   //1 const shortLivedToken = decoded.shortLivedToken
   //1 req.session = { shortLivedToken}

    next();
  



} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'not authenticated' });
  }
}

module.exports = {
  authenticationMiddleware,
};
