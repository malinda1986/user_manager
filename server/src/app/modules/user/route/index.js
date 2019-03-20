const express = require('express');
const userController = require('../controller');
const router = express.Router();

function userRoutes(handler) {
    router.route('/profile/:id')
        .put(handler(userController.save));
    router.route('/admin/login')
        .put(handler(userController.adminLogin));
    router.route('/profile')
        .post(handler(userController.create));
    router.route('/profile/list')
        .get(handler(userController.list));
    router.route('/profile/:id')
        .get(handler(userController.get));
    router.route('/profile/:id')
        .delete(handler(userController.deleteUser));
    router.route('/profile/upload')
        .post(handler(userController.upload));
    return router;
}
module.exports = userRoutes;
