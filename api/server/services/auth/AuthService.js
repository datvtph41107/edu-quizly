import response from "../../utils/response";
import LOGGER from "../../utils/logger";
// import SendEmailJob from "../../jobs/sendEmailJob";
import ConfirmEmailService from "./ConfirmEmailService";
import Consts from "../../utils/consts";
import Utils from "../../utils/utils";
import Role from "../../utils/role";
import User from "../../models/schema/User";
import UserSecuritySetting from "../../models/schema/UserSecuritySetting";
import RolePermission from "../../models/schema/RolePermission";
import RevokedTokens from "../../models/schema/RevokeToken";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
    static async register(request) {
        try {
            const { email, password } = request;

            const user = await User.findOne({ email });
            if (user) {
                return response.WARN(400, "", "Email already used!");
            }
            const hashedPassword = bcrypt.hashSync(password, 8);
            const generateCode = Utils.randomString(6);
            const userName = this.randomUsername();
            const permissionId = await RolePermission.findOne({ name: Role.CLIENT.name });
            if (permissionId) {
                console.log(permissionId);
            } else {
                console.log("Permission not found!");
            }

            const data = {
                email: email,
                username: userName,
                password: hashedPassword,
                role_permission_id: permissionId._id,
            };
            this.create(data, generateCode);
            // send Email
            // SendEmailJob.addEmailJob("register", {
            //     toEmail: email,
            //     username: userName,
            //     generateGGcode,
            // });

            return response.SUCCESS(200, "", "User registration successful!");
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(500, "", error.message);
        }
    }

    static async login(request) {
        try {
            const { user } = request;

            const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1h", //
            });

            const refreshToken = jwt.sign({ user: user }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "7d", // 604800 24h x 7
            });

            // cookie HTTP-only hoặc localStorage
            const data = {
                accessToken,
                refreshToken,
            };
            return response.SUCCESS(200, "Login success", data);
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(500, "", error.message);
        }
    }

    static async refreshToken(req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(403).send("Refresh token is required");
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const newAccessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1h",
            });
            const data = {
                newAccessToken,
            };
            return response.SUCCESS(200, "refresh Token success", data);
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(403, "Invalid or expired refresh token", error.message);
        }
    }

    static async logout(req) {
        try {
            const { authorization } = req.headers;
            const token = authorization && authorization.split(" ")[1];
            if (!token) {
                return response.ERROR(400, "Token is required.");
            }

            const revokedToken = new RevokedTokens({ token });
            await revokedToken.save();
            return response.SUCCESS(200, "", "Successfully logged out and token revoked!");
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(500, "Error revoking token.", error.message);
        }
    }

    static async sendCodeRegister(request) {
        try {
            const { email } = request;
            if (!email) {
                return response.ERROR(400, "", "Bad request");
            }
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Email not exist");
            }

            const generateCode = Utils.randomString(6);
            await UserSecuritySetting.updateOne(
                { id: user.id },
                {
                    $set: {
                        email_verification_code: generateCode,
                        mail_register_created_at: Utils.currentMilliseconds(),
                        updated_at: new Date(),
                    },
                },
            );
            return response.SUCCESS(200, "", "Send code successfully!");
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(500, "", error.message);
        }
    }

    static async confirmCode(request) {
        try {
            const { code } = request;
            if (!code) {
                return response.WARN(400, "", "Code invalid!");
            }

            const currentTime = Utils.currentMilliseconds();

            const setting = await UserSecuritySetting.findOne({
                email_verification_code: code,
                email_verified: false,
            });

            if (!setting) {
                throw new Error("Email registration expired or email was already in use");
            }
            const timeElapsed = currentTime - setting.mail_register_created_at;

            if (timeElapsed > 30 * 1000) {
                throw new Error("Verification code has expired");
            }

            const confirm = await ConfirmEmailService.confirm(setting, code);
            return response.SUCCESS(200, "Email confirmation successfully!", confirm);
        } catch (error) {
            console.log(error.message);

            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(500, "Internal Server Error", error.message || "An error occurred");
        }
    }

    static async create(data, generateCode) {
        try {
            const user = new User(data);
            await user.save();
            console.log(user);

            let existingSettings = await UserSecuritySetting.findOne({ id: user._id });
            if (existingSettings) {
                existingSettings.mail_register_created_at = Utils.currentMilliseconds() - 30 * 1000;
                existingSettings.email_verification_code = generateCode;
                await existingSettings.save();
            } else {
                const newUserSecuritySetting = new UserSecuritySetting({
                    id: user._id,
                    mail_register_created_at: Utils.currentMilliseconds() - 30 * 1000,
                    email_verification_code: generateCode,
                });
                await newUserSecuritySetting.save();
            }

            return response.SUCCESS(200, "User registration successful!", user);
        } catch (error) {
            LOGGER.APP.error(JSON.stringify(error));
            return response.ERROR(500, "", error.message);
        }
    }

    static randomUsername() {
        const name = "user";
        const result = Utils.randomString(6);
        return name + result;
    }

    static generateUniqueReferrerCode(length = 8) {
        const random = Utils.randomString(length);
        return random;
    }
}

module.exports = AuthService;
