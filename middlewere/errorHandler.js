const errorHandler = (err, req, res, next) => {
   let code = 0
   let msg = {}

   switch (err.name) {
      case "SequelizeValidationError":
         code = 400
         msg = err.errors[0].message
         break;

      case "SequelizeUniqueConstraintError":
         code = 400
         msg = err.errors[0].message
         break;

      case "Invalid email or password":
         code = 401
         msg = { message: "Invalid email or password" }
         break;

      case "Invalid Token":
         code = 401
         msg = { message: "Invalid Token" }
         break;

      case "Invalid User":
         code = 401
         msg = { message: "Invalid User" }
         break;

      case "JsonWebTokenError":
         code = 401
         msg = { message: "Invalid Token" }
         break;

      case "Unauthorized":
         code = 403
         msg = { message: "Unauthorized" }
         break;
      case "Job Not Found":
         code = 404
         msg = { message: "Job Not Found" }
         break;

      default:
         code = 500
         msg = { message: "Internal server error" }
         break;
   }
   res.status(code).json(msg)
}

module.exports = errorHandler