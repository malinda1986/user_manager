
const base64ToImage = require('base64-to-image');
const imgur = require('imgur');
const User = require('../../models/User');
const locations = require('./data/location.json');
const options = require('./data/option.json');

const get = ({options}) => {
    const id = options.params.id;
    return new Promise((resolve, reject) => {
        User.findById(id)
        .lean()
        .then(user => {
            return resolve(user);
        })
        .catch(e => {
            return reject(e);
        });
    });
};

const save = ({body}) => {
    const query = {};
    const options = {upsert: true, 'new': true, setDefaultsOnInsert: true};
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(query, body && body.data ? body.data : body, options, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const getParams = () => {
    return new Promise((resolve) => {
        resolve({locations, options});
    });
};

const upload = ({body}) => {
    return new Promise((resolve, reject) => {
        const imgData = body.data.file;
        const base64Str = imgData;
        const path = 'uploads/';
        const optionalObj = {fileName: body.data.id, type: 'jpg'};
        try {
            const imageInfo = base64ToImage(base64Str, path, optionalObj);
            resolve({imageInfo});
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    get,
    save,
    getParams,
    upload,
};
