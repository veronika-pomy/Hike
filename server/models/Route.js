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
        },
        index: {
            type: String,
            value: '1',
            required: false,
            unique: false
        }
    }
);

const Route = model('Route', routeSchema);

Route.createIndexes();

module.exports = Route;