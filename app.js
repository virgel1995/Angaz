const fs = require('fs');
// Logger
if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}
require("dotenv").config()
const express = require("express")
const Logger = require('./app/logger');
const ExpressApplication = require('./config/express');
const config = require('./config');
const { sequelize, seedSiteSettings } = require('./database');

const app = express()
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(express.static('public'));
app.use(express.json({
    limit: '100mb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '100mb'
}))
const DatabaseMigrationFromOld = require('./app/DatabaseMigration');


ExpressApplication(app);
let server;
async function startServer() {
    const MAX_RETRIES = 10;
    let retryCount = 0;
    const connectToDatabase = async () => {
        try {
            await sequelize.sync({
                alter: true,
            });
            server = app.listen(config.PORT);
            Logger.success('Successfully connected to database');
            Logger.success(`Server started on port ${config.PORT}`);
            seedSiteSettings()
            if (process.env.SEED_DATA === 'true') {
                // seed data here 
            }
            if (process.env.GET_OLD_DATABASE === 'true') {
                const DbMigration = new DatabaseMigrationFromOld();
                DbMigration.initConnection(); // to connect to old database 
                // Do not uncomment this DbMigration.migrate() Now as it will create new database
                // DbMigration.migrate(); // to migrate old database to new
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            Logger.error('Unable to connect to database', error);
            if (retryCount < MAX_RETRIES) {
                retryCount++;
                Logger.info(
                    `Retrying to connect to the database in 5 seconds... (Attempt ${retryCount}/${MAX_RETRIES})`
                );
                setTimeout(connectToDatabase, 5000);
            } else {
                throw new Error('Unable to connect to database after maximum retries');
            }
        }
    };
    await connectToDatabase();
}
startServer();
const exitHandler = () => {
    if (server) {
        server.close(() => {
            Logger.info('Server closed');
            // process.exit(1)
            // startServer();
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    // eslint-disable-next-line no-console
    console.log({
        msg: 'uncaughtException',
        error,
    });
    //  Logger.error('uncaughtException', error);

    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    Logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
