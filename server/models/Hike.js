const { Schema, model } = require('mongoose');

const hikeSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      longitude: {
        type: String,
        required: true,
      },

      latitude: {
        type:  String,
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
