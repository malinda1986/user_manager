const express = require('express');
const middleware = require('./middleware');

const init = function() {
    try {
        const parentApp = express();
        parentApp.use(express.static('uploads'));
        middleware(parentApp);
        return parentApp;
    } catch (e) {
        console.log(e);
    }
};

module.exports = init;
