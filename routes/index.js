const WebHooksRoutes = require('./webhook')
const AdminRoutes = require('./Admin')
const UsersRoutes = require('./Users')
const projectRoutes = require("./project")
const ServicesRoutes = require('./service') 
module.exports = (app) => {
    // all Routes Here 
    app.use('/admin', AdminRoutes);
    app.use('/user', UsersRoutes);
    app.use("/project", projectRoutes)
    app.use("/service", ServicesRoutes)




    // webHook Routes Used Later
    app.use('/webhook', WebHooksRoutes);
    //  Server Status 
    app.get('/status', (req, res) => {
        const date =
            new Date().getUTCFullYear() +
            '-' +
            new Date().getUTCMonth() +
            '-' +
            new Date().getUTCDate() +
            '-' +
            (new Date().getUTCHours() + 2) +
            ':' +
            new Date().getUTCMinutes() +
            ':' +
            new Date().getUTCSeconds();
        res.json({
            Date: date,
            Status: 'online',
        });
    });

    app.get('/', (req, res) => {
        res.send('Ok');
    });
};
