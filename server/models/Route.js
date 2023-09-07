const { Schema, model } = require('mongoose');

const routeSchema = new Schema(
    {
        routeName: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        hikeName: {
            type: String,
            required: false,
        }
    }
);

const Route = model('Route', routeSchema);

module.exports = Route;