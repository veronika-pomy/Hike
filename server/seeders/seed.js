const db = require('../config/connection');
const { User, Hike, SubscriberList, Route } = require('../models');

const userSeeds = require('./userSeeds.json');
const hikeSeeds = require('./hikeSeeds.json');
const subscriberListSeeds = require('./subscriberListSeeds.json');
const routeSeeds = require('./routeSeeds.json');

db.once('open', async () => {

    try {

        // drop all data before seeding 
        await User.deleteMany({});
        await Hike.deleteMany({});
        await SubscriberList.deleteMany({});
        await Route.deleteMany({});

        await SubscriberList.create(subscriberListSeeds);
        await User.create(userSeeds);
        
        for (hikeSeed of hikeSeeds) {
            const { _id, hiker } = await Hike.create(hikeSeed);

            const user = await User.findOneAndUpdate(
                { username: hiker },
                {
                    $push: {
                        hike: _id,
                    },
                }
            );
        };

        for (routeSeed of routeSeeds) {
            const { _id, hikeName } = await Route.create(routeSeed);

            const hike = await Hike.findOneAndUpdate(
                { name: hikeName },
                {
                    $push: {
                        route: _id,
                    },
                }
            );
        };

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Data seeded 🌱');
    process.exit(0);

});