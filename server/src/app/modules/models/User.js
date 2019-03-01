const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {type: String, required: true, index: true},
    DisplayName: {
        type: String, required: true
    },
    RealName: {
        type: String, required: false,
    },
    ProfilePicture: {
        type: String, required: false,
    },
    Birthday: {
        type: String, required: true
    },
    Gender: {
        type: String, required: true
    },
    Ethnicity: {
        type: String, required: false
    },
    Religion: {
        type: String, required: false,
    },
    Height: {
        type: String, required: false,
    },
    Figure: {
        type: String, required: false,
    },
    MaritalStatus: {
        type: String, required: true,
    },
    AboutMe: {
        type: String, required: false,
    },
    Occupation: {
        type: String, required: false,
    },
    Location: {
        type: String, required: true,
    },
    Created: {type: Date, 'default': Date.now()},
    Modified: {type: Date, 'default': Date.now()},
});

const UserModal = mongoose.model('user', userSchema);
module.exports = UserModal;
