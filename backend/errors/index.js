const CustomAPIError = require('./customApi');
const UnauthenticatedError = require('./unAuthenticated')
const NotFoundError = require('./notFound');
const BadRequestError = require('./badRequest');
const UnauthorizedError = require('./unAuthorized');
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};