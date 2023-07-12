const { User, Hike } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// TODO: Add authentication after verifying that queries and mutations work

const resolvers = {

    Query: {
        user: async (parent, args, context) => {
            return User.findById(context.user._id).populate('hike');
        },

        hike: async (parent, { id }) => {
            return Pet.findById(id);
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

        addHike: async(parent, { name, longitude, latitude }, context ) => {
            if(context.user) {
                const hike = await Hike.create({ name, longitude, latitude });

                await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $push: { hike: hike._id }}
                );
    
                return hike;
            }

            throw new AuthenticationError('Please log in.');
        },

        updateHike: async (parent, { _id, name, longitude, latitude }) => {
            // TODO: Add resolver for updating hike name, lon and lat
        },

        removeHike: async (parent, { name }, context) => {
            if (context.user) {
                const hike = await Hike.findOneAndDelete({
                    name: name
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { hike: hike._id } }
                );

                return hike;
            }

            throw new AuthenticationError('Please log in.');
        },
    },
    
};

module.exports = resolvers;