const { Admin, User } = require('../database');
const TokenManager = require('../app/jwt');

class CheckAuthrization {
 constructor() {}
 /**
  * Checks if the user is authorized to access the resource.
  *
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @param {Function} next - The next function to call.
  * @return {void}
  */
 static async checkAuthrizationAdmin(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
   return res.status(401).json({
    error: true,
    message: 'No Authorization Provided',
    code: 401,
   });
  }
  const decode = TokenManager.compareToken(authorization);
  if (decode.error) {
   return res.status(401).json({
    error: true,
    message: decode.message,
    code: 401,
   });
  }
  const user = await Admin.findByPk(decode.id);
  if (!user) {
   return res.status(401).json({
    error: true,
    message: 'User not found',
    code: 401,
   });
  }
  next();
 }
 /**
  * Checks the authorization of a teacher.
  *
  * @param {Object} req - the request object
  * @param {Object} res - the response object
  * @param {Function} next - the next middleware function
  * @return {void}
  */
 static async checkAuthrizationUser(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
   return res.status(401).json({
    error: true,
    message: 'No Authorization Provided',
    code: 401,
   });
  }
  const decode = TokenManager.compareToken(authorization);
  if (decode.error) {
   return res.status(401).json({
    error: true,
    message: decode.message,
    code: 401,
   });
  }
  const user = await User.findByPk(decode.id);
  if (!user) {
   return res.status(401).json({
    error: true,
    message: 'User not found',
    code: 401,
   });
  }
  req.user = user
  next();
 }
}
module.exports = CheckAuthrization;
