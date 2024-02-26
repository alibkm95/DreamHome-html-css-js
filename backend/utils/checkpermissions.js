const CustomError = require('../errors');

const checkpermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'ADMIN') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkpermissions;