const { mongoose } = require("mongoose");
const connectDb = require("../config/connectDB");
const path = require("path");
const fs = require("fs");
const runSeeders = async () => {
    const seederFiles = fs.readdirSync(path.join(__dirname, "./seeds"));
    console.log(seederFiles);

    for (const file of seederFiles) {
        console.log("--Running seeding files: ", file);

        if (file.endsWith(".js")) {
            const seeder = require(`./seeds/${file}`);

            try {
                await seeder();
            } catch (err) {
                console.error(`Error seeding ${file}:`, err);
            }
        }
    }
    mongoose.connection.close();
};
const connectAndRunSeeders = async () => {
    try {
        await connectDb();
        await runSeeders();
    } catch (err) {
        console.error("Error during connection or seeding:", err);
    } finally {
        mongoose.connection.close();
    }
};

connectAndRunSeeders();
