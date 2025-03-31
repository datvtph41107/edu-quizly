import LOGGER from "../../utils/logger";
import Consts from "../../utils/consts";
import UserSecuritySetting from "../../models/schema/UserSecuritySetting";
import User from "../../models/schema/User";
// import { queue } from "../../jobs/sendEmailJob";

class ConfirmEmailService {
    static async confirm(setting) {
        try {
            const userId = setting.id;

            if (setting) {
                await this.updateSetting(setting);
                await this.updateUser(userId);
                // await this.queueAndNotifyRegistedSuccess(userId);
                // more setting device service
                // more setting language service
            }
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
        }
    }

    static async updateSetting(setting) {
        console.log(setting._id);

        try {
            const result = await UserSecuritySetting.updateOne(
                { _id: setting._id },
                {
                    $set: {
                        email_verification_code: null,
                        mail_register_created_at: null,
                        email_verified: true,
                        updated_at: new Date(),
                    },
                },
            );

            if (result.nModified === 0) {
                throw new Error("No documents were updated in user_security_settings");
            }

            console.log("User security settings updated successfully.");
        } catch (error) {
            LOGGER.APP.error("Error updating user security settings: " + JSON.stringify(error));
            throw error;
        }
    }

    static async updateUser(userId) {
        try {
            const result = await User.updateOne(
                { _id: userId },
                {
                    $set: {
                        status: Consts.USER_ACTIVE,
                    },
                },
            );

            if (result.nModified === 0) {
                throw new Error("No documents were updated in users");
            }

            console.log("User status updated successfully.");
        } catch (error) {
            LOGGER.APP.error("Error updating user status: " + JSON.stringify(error));
            throw error;
        }
    }

    // static async queueAndNotifyRegistedSuccess(userId) {
    //     try {
    //         await queue.addJob("create_new_user", {});
    //     } catch (error) {
    //         LOGGER.APP.error(JSON.stringify(error));
    //     }
    // }
}

module.exports = ConfirmEmailService;
