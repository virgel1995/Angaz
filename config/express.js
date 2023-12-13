const exceptionHandler = require('express-exception-handler');
exceptionHandler.handle();
const { ErrorMangement } = require('../middleware');
const allAppRoutes = require('../routes');
const config = require('.');

const ExpressApplication = (app) => {
    const allowedHeaders = config.allowedHeaders.join(', ');
    app.use((req, res, next) => {
        const origin = req.get('origin');
        res.set('x-powered-by', 'Virus24');
        res.set('Connection', 'keep-alive');
        if (req.method === 'OPTIONS') {
            if (config.Client_Url.includes(origin)) {
                res.set('Access-Control-Allow-Origin', origin);
            }
            res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.set('Access-Control-Allow-Headers', allowedHeaders);
            res.set('Content-Length', '0');
            res.status(204).end();
        } else {
            // Handle other requests
            if (config.Client_Url.includes(origin) || !origin) {
                if (origin) {
                    res.set('Access-Control-Allow-Origin', origin);
                }
                res.set('Access-Control-Allow-Headers', allowedHeaders);
                // res.set('Content-Encoding', 'gzip');
                // res.set('Content-Type', 'application/json');
                res.set('Access-Control-Allow-Credentials', true);
                res.set(
                    'Access-Control-Allow-Methods',
                    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                );
                res.set('Access-Control-Max-Age', '86400');
                res.set('X-Frame-Options', 'SAMEORIGIN');
                res.set('X-XSS-Protection', '1; mode=block');
                res.set('X-Content-Type-Options', 'nosniff');
                res.set('Referrer-Policy', 'no-referrer');
                res.set('Cross-Origin-Embedder-Policy', 'require-corp');
                res.set('Cross-Origin-Opener-Policy', 'same-origin');
                res.set('Cross-Origin-Resource-Policy', 'same-origin');
                res.set(
                    'Strict-Transport-Security',
                    'max-age=31536000; includeSubDomains; preload'
                );
                next();
            } else {
                res.status(403).json({
                    message: 'Origin not allowed',
                    status: 'Forbidden',
                    error: true,
                    code: 403,
                });
            }
        }
    });

    //  // eslint-disable-next-line no-unused-vars
    //  app.use((err, req, res, next) => {
    //   if (err.message === 'Origin not allowed') {
    //    res.status(403).json({ error: 'Origin not allowed' });
    //   } else {
    //    res.status(500).json({ message: err.message });
    //   }
    //  });
    allAppRoutes(app);
    //  swagger docs 
    require('./Swagger')(app)
    app.use(ErrorMangement.handler);
    app.use(ErrorMangement.notFound);
};

module.exports = ExpressApplication;
