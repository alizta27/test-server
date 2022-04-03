const { verify } = require('../helpers/jwt');
const { User, News, Customer } = require('../models');

const authUser = async (req, res, next) => {
   try {
      const { access_token } = req.headers
      if (!access_token) {
         throw {
            name: "Invalid Token"
         }
      }

      const payload = verify(access_token)
      let id = payload.id
      const userLoginData = await User.findByPk(id)

      if (!userLoginData) {
         throw {
            name: "Invalid Token"
         }
      }

      req.userAccessLogin = {
         id: userLoginData.id,
         username: userLoginData.username,
         role: userLoginData.role
      }
      next()
   } catch (error) {
      next(error)
   }
}

module.exports = {
   authUser,
};