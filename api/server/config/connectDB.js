const mongoose = require("mongoose");
const { dbConfig } = require("./config");
const LOGGER = require("../utils/logger");

const connectDb = async () => {
    try {
        const dbURI = `mongodb://${dbConfig.connection.host}:${dbConfig.connection.port}/${dbConfig.connection.database}`;
        // const options = {
        //     user: dbConfig.connection.username || undefined,
        //     pass: dbConfig.connection.password || undefined,
        // };

        await mongoose
            .connect(dbURI)
            .then((va) => {
                console.log("connected");
            })
            .catch((e) => console.log(e));
    } catch (err) {
        LOGGER.DB.error(`Could not connect to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;
