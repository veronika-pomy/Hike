const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
        type: String,
        required: true,
        unique: true,
    },

        email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must use a valid email address.'],
    },

        password: {
        type: String,
        required: true,
        match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, 'Password must be at least eight characters long and include one lowercase letter, uppercase, number, and symbol.'],
    },

    hike: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Hike',
            },
        ],
    },
);

// hash user pwd
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// validate pwd 
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;