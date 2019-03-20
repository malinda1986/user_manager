
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

const save = ({body, options}) => {
    const query = {_id: options.params.id};
    const option = {upsert: true};
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(query, body && body.data ? body.data : body, option, function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

const create = ({body}) => {
    return new Promise((resolve, reject) => {
        const user = new User(body);
        user.save(function(error, result) {
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
        const imgData = body.file;
        const base64Str = imgData;
        const path = 'uploads/';
        const optionalObj = {fileName: body.id, type: 'jpg'};
        try {
            const imageInfo = base64ToImage(base64Str, path, optionalObj);
            resolve({imageInfo});
        } catch (e) {
            reject(e);
        }
    });
};

const list = () => {
    return new Promise((resolve, reject) => {
        User.find({})
        .lean()
        .then(user => {
            return resolve(user);
        })
        .catch(e => {
            return reject(e);
        });
    });
};

const deleteUser = ({options}) => {
    return new Promise((resolve, reject) => {
        User.remove({_id: options.params.id})
        .then(user => {
            return resolve(user);
        })
        .catch(e => {
            return reject(e);
        });
    });
};

module.exports = {
    get,
    save,
    deleteUser,
    create,
    getParams,
    upload,
    list,
};
