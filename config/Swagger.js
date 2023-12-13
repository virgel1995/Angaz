const { serve, setup } = require('./SwaggerServer');
const swaggerDocument = require('./openapi.json')
module.exports = (app) => {
    var options = {
        customCss: `
        .swagger-ui .topbar { display: none }
        `,
        customfavIcon: '/favicon.ico',
        customSiteTitle: 'Engaz API'
    };
    app.use('/docs', serve)
    app.get('/docs', setup(swaggerDocument, options))
}
