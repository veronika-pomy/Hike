const { Schema, model } = require('mongoose');

const subscriberListSchema = new Schema(
    {
        subscriberEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must use a valid email address.'],
      },
    }
  );

const SubscriberList = model('SubscriberList', subscriberListSchema);

module.exports =  SubscriberList;
