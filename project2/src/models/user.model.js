const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'artist'],
        default: 'user'
    }
});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

// Fallback alias so 'user' (lowercase) also works with populate refs
if (!mongoose.models.user) {
    mongoose.model('user', userSchema);
}

module.exports = userModel;