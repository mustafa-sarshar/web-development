const setCookie = (res, cookieName, cookieValue, cookieOptions = {}) => {
  // Retrieved from https://stackoverflow.com/questions/16209145/how-can-i-set-cookie-in-node-js-using-express-framework (accessed on 10.05.2023)
  const options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    // signed: true, // Indicates if the cookie should be signed
  };
  res.cookie(cookieName, cookieValue, options);
};

const getCookie = (req, cookieName) => {
  // Retrieved from https://stackoverflow.com/questions/16209145/how-can-i-set-cookie-in-node-js-using-express-framework (accessed on 10.05.2023)
  const cookies = req.cookies;
  if (cookies) {
    if (cookies[cookieName]) {
      return cookies[cookieName];
    }
  }
  return undefined;
};

module.exports = { setCookie, getCookie };
