const {  Admin } = require('../database');
class CheckAdminLevel {
 static getAdmin = async (adminId) => {
  if (!adminId) {
   return {
    error: true,
    message: 'Admin Id is required (adminId)',
    code: 403,
    admin: null,
   };
  }
  const admin = await Admin.findByPk(adminId);
  if (!admin) {
   return {
    error: true,
    message: 'Admin not found',
    code: 404,
    admin: null,
   };
  }
  return {
   error: false,
   code: 200,
   message: 'Admin found',
   admin,
  };
 };

 static checkLevel = (requiredLevel) => {
  return async (req, res, next) => {
    const adminId = req.body?.adminId || req.query?.adminId || req.params?.adminId;
    const { error, admin, code, message } = await this.getAdmin(adminId);
   if (error) {
    return res.status(code).json({
     error: true,
     message,
     code,
    });
   }
   const levels = {
    super: 4,
    high: 3,
    mid: 2,
    low: 1,
   };
   const requiredLevelNum = levels[requiredLevel];
   const adminLevelNum = levels[admin.level];
   if (adminLevelNum < requiredLevelNum) {
    return res.status(403).send({
     error: true,
     message: `Required Admins With Level (${requiredLevel}) to access`,
     code: 403,
    });
   }
   next();
  };
 };
}
module.exports = CheckAdminLevel;
