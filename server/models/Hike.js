const { Schema, model } = require('mongoose');

const hikeSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },

      latitude: {
        type:  Number,
        required: true,
      },
    },
  );

const Hike = model('Hike', hikeSchema);

module.exports = Hike;
