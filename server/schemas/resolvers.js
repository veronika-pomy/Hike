const { User, Hike, SubscriberList } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        user: async (parent, args, context) => {
            if(context.user) {
                return User.findById(context.user._id).populate('hike');
            }
            throw new AuthenticationError('Please log in.');
        },

        hike: async (parent, { id }) => {
            return Hike.findById(id);
        }
    },

    Mutation: {
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email or password');
              }

              const correctPWD = await user.isCorrectPassword(password);

              if (!correctPWD) {
                throw new AuthenticationError('Incorrect email or password');
              }

              const token = signToken(user);
              return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            
            const token = signToken(user);
            return { token, user };
        },

        addHike: async(parent, { name, lng, lat }, context ) => {
            if(context.user) {
                const hike = await Hike.create({ name, lng, lat, hiker: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $push: { hike: hike._id }}
                );
    
                return hike;
            }

            throw new AuthenticationError('Please log in.');
        },

        addSubscriberList: async(parent, { subscriberEmail }) => {

                const newSubscriberEmail = await SubscriberList.create({ subscriberEmail });
                
                return newSubscriberEmail;
        },

        updateHike: async (parent, { _id, name, lng, lat }, context) => {
            if (context.user) {
                return await Hike.findOneAndUpdate(
                    { _id: _id }, 
                    { name },
                    { lng },
                    { lat },
                    { new: true }
                );
            }

            throw new AuthenticationError('Please log in.');
        },

        removeHike: async (parent, { _id }, context) => {
            if (context.user) {
                const hike = await Hike.findOneAndDelete({
                    _id: _id
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { hike: hike._id } }
                );

                return hike;
            }

            throw new AuthenticationError('Please log in.');
        },

        removeSubscriberList: async(parent, { subscriberEmail }) => {

            const subscriberEmailToDelete = await SubscriberList.findOneAndDelete({
                subscriberEmail: subscriberEmail
            });

            return subscriberEmailToDelete;
        },
    },
};

module.exports = resolvers;