const { comparePassword } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
   static async loginUser(req, res, next) {
      try {
         const { email, password } = req.body;
         const user = await User.findOne({
            where: {
               email
            }
         })
         if (!user) {
            throw {
               name: "Invalid Email"
            }
         }
         const isPasswordValid = comparePassword(password, user.password)
         if (!isPasswordValid) {
            throw {
               name: "Invalid Password"
            }
         }
         const payload = {
            id: user.id,
         }
         const token = sign(payload)
         res.status(200).json({
            message: "OK", access_token: token, userLoginData: {
               username: user.username,
               role: user.role
            }
         })
      } catch (error) {
         next(error)
      }
   }

   static async registerUser(req, res, next) {
      try {
         const { email, password, username, phoneNumber, address } = req.body;
         const role = "admin"

         const userRegis = await User.create({
            email, password, username, phoneNumber, address, role
         })

         res.status(201).json({ message: "Created", userData: userRegis.username })
      } catch (error) {
         next(error)
      }
   }
}

module.exports = UserController;