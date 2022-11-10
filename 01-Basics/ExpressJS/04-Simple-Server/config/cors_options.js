// Any server you wanna allow to access your server or backend
const whitelist = [
    "http://127.0.0.1:8080"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;