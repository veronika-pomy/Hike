const { User, Hike, SubscriberList, Route } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        user: async (parent, args, context) => {
            if(context.user) {
                return User.findById(context.user._id)
                .populate({
                    path: 'hike', 
                    options: {sort: {name: 1}, populate: { path: 'route' } }
                })
                ;
            };
            throw new AuthenticationError('Please log in.');
        },

        // hike: async (parent, {_id }) => {
        //     return Hike.findById(_id);
        // }
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

        addRoute: async(parent, { routeName, origin, destination }, context ) => {
            if(context.user) {
                const route = await Route.create({ routeName, origin, destination, hikeName: context.user.hike[0] });

                await Hike.findByIdAndUpdate(
                    { _id: context.user.hike[0]},
                    { $push: {route: route._id }}
                );
    
                return route;
            }

            throw new AuthenticationError('Please log in.');
        },

        addSubscriberList: async(parent, { subscriberEmail }) => {

                const newSubscriberEmail = await SubscriberList.create({ subscriberEmail });
                
                return newSubscriberEmail;
        },

        updateHike: async (parent, { _id, name }, context) => {
            if (context.user) {
                const updatedHikeName = await Hike.findOneAndUpdate(
                    {_id: _id},
                    {name: name}
                );

                return updatedHikeName;
            }

            throw new AuthenticationError('Please log in.');
        },

        updateRoute: async (parent, { _id, routeName }, context) => {
            if (context.user) {
                const updatedRouteName = await Route.findOneAndUpdate(
                    {_id: _id},
                    {routeName: routeName}
                );

                return updatedRouteName;
            }

            throw new AuthenticationError('Please log in.');
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

        removeRoute: async (parent, { routeName }, context) => {
            if (context.user) {
                const route = await Route.findOneAndDelete({
                    routeName: routeName
                });

                await Hike.findOneAndUpdate(
                    { _id: context.user.hike[0] },
                    { $pull: { route: route._id } }
                );

                return route;
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