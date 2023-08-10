const { Schema, model } = require('mongoose');

const hikeSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      lng: {
        type: Number,
        required: true,
      },

      lat: {
        type:  Number,
        required: true,
      },

      hiker: {
        type:  String,
        required: false,
      },
    },
  );

const Hike = model('Hike', hikeSchema);

module.exports = Hike;
