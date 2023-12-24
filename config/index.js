const HTTP_PORT = process.env.PORT || 3001;
const ALLOWED_HEADERS = [
    'X-Requested-With',
    'Authorization',
    'Content-Type',
    'Origin',
    'Accept',
];
const ArabicRegex =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFBC2\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFEFC]/g;
const CLIENT_URL = [
    process.env.CLIENT_URL,
    process.env.APP_URL,
    'http://localhost:3000'
]
const APP_URL= process.env.APP_URL || 'http://localhost:3000'
const ALLOWED_ADMIN_LEVELS = ['super', 'high', 'mid', 'low']
const ALLOWED_GENDER = ['male', 'female']
const ALLOWED_USER_ROLE = ["client", "freelancer"]
const config = {
    APP_NAME: process.env.APP_NAME || 'Engaz',
    PORT: HTTP_PORT,
    allowedHeaders: ALLOWED_HEADERS,
    ArabicRegex,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret_key',
    Client_Url: CLIENT_URL,
    App_Url : APP_URL,
    ALLOWED_ADMIN_LEVELS,
    ALLOWED_GENDER,
    ALLOWED_USER_ROLE
}

module.exports = config