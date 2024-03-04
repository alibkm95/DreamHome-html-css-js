
const setHeaders = (req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');

  // Allow specific headers to be sent in the request
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow credentials (e.g., cookies, authentication) to be included in requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}

module.exports = setHeaders