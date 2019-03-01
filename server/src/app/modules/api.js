const express = require('express');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');

const userHandler = require('./user');
const api = require('../api');
const config = require('../config');

const swaggerDocument = require('../doc/api.json');

const {app_path} = config.get('api');

const apiRoutes = function(middleware) {
    try {

        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, '/uploads');
            },
            filename: function(req, file, cb) {
                cb(null, file.originalname);
            }
        });
        const upload = multer({storage: storage});

        const router = express.Router();
        const {api: {cors}} = middleware;
        // enable CORS
        router.use(cors());
        router.use(`${app_path}`, upload.single('file'), userHandler.routes(api.http));

        router.use(`${app_path}/apidoc`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        return router;
    } catch (e) {
        console.log(e);
    }
};

module.exports = apiRoutes;
