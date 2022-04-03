const jwt = require('jsonwebtoken');
const key = process.env.KEY;

const sign = (payload) => {
   return jwt.sign(payload, key);
}

const verify = (token) => {
   return jwt.verify(token, key);
}

module.exports = {
   sign,
   verify
}