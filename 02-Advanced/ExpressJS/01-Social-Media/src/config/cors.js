const cors = require("cors");

/**
 * The global configuration for CORS
 */
const corsMiddleware = cors({
  origin: (origin, callback) => {
    let allowedOrigins = ["http://localhost:4200", "*"];

    if (!origin || allowedOrigins.indexOf("*") > -1) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) === -1) {
      // If a specific origin isn’t found on the list of allowed origins
      const message =
        "The CORS policy for this application doesn't allow access from origin " +
        origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

module.exports = { corsMiddleware };
