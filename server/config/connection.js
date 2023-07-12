const mongoose = require('mongoose');

// TODO: add mongodb_uri when ready to deploy

mongoose.connect('mongodb://127.0.0.1:27017/hike', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.export = mongoose.connection;