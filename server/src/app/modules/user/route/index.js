const express = require('express');
const userController = require('../controller');
const router = express.Router();

function userRoutes(handler) {
    router.route('/profile/:id')
        .put(handler(userController.save));
    router.route('/profile')
        .post(handler(userController.save));
    router.route('/profile/params')
        .get(handler(userController.getParams));
    router.route('/profile/:id')
        .get(handler(userController.get));
    router.route('/profile/upload')
        .post(handler(userController.upload));
    return router;
}
module.exports = userRoutes;
