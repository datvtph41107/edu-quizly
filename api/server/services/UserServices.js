import LOGGER from "../utils/logger";
import response from "../utils/response";
import User from "../models/schema/User";

class UserServices {
    static async getUser(req) {
        try {
            // Kiểm tra xem email đã tồn tại chưa
            const { user } = req;

            // if (existingUser) {
            //     return response.ERROR(400, "Email already exists", { email });
            // }

            // Create a new user instance
            // const user = new User({
            //     username,
            //     email,
            //     password,
            // });

            // Save the user to the database
            // await user.save();
            return response.SUCCESS(200, "Successfully added user", user); // Return the created user object
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(500, "", error.message); // Return the error message
        }
    }
}

module.exports = UserServices;
