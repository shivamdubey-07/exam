const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTSECRETKEY;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("my teacher token is ",token)

  if (token) {
  console.log("my token in is condition is ",token)

    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        req.user = decodedToken;
       console.log("decode token is",decodedToken);
    
      
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = requireAuth; 
