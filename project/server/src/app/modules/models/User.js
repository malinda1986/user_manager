const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: String, required: true, index: true, 'default': Date.now()},
    DisplayName: {
        type: String, required: true
    },
    Address: {
        type: String, required: false,
    },
    Telephone: {
        type: String, required: false,
    },
    ProfilePicture: {
        type: String, required: false,
    },
    Birthday: {
        type: String, required: false
    },
    Gender: {
        type: Boolean, required: false
    },
    Mobile: {
        type: String, required: false
    },
    Religion: {
        type: String, required: false,
    },
    Height: {
        type: String, required: false,
    },
    Email: {
        type: String, required: false,
    },
    Password: {
        type: String, required: false,
    },
    AboutMe: {
        type: String, required: false,
    },
    Occupation: {
        type: String, required: false,
    },
    Location: {
        type: String, required: false,
    },
    Created: {type: Date, 'default': Date.now()},
    Modified: {type: Date, 'default': Date.now()},
});

const UserModal = mongoose.model('user', userSchema);
module.exports = UserModal;
