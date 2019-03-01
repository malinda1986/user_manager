// make sure env is set properly
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const profileService = require('./app');
const Server = require('./app/server');
const app = profileService();

Server.start(app).catch(error => {
    // TODO: logging
    console.log(error);
    /*eslint-disable */
    process.exit(0);
});
