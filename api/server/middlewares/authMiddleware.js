import LOGGER from "../utils/logger";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/schema/User";
import UserSecuritySetting from "../models/schema/UserSecuritySetting";
import Consts from "../utils/consts";
import RevokedTokens from "../models/schema/RevokeToken";

class AuthMiddleware {
    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send("Access token is missing");
        }
        const isRevoked = await AuthMiddleware.isTokenRevoked(token);
        if (isRevoked) {
            return res.status(401).send("Token has been revoked");
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Invalid or expired token");
            }
            req.user = user.user;
            next();
        });
    }

    static async isTokenRevoked(token) {
        const revokedToken = await RevokedTokens.findOne({ token });
        return revokedToken !== null;
    }

    static async preLoginAccess(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email, status: Consts.USER_ACTIVE });
            if (!user) {
                return response.WARN(404, "", "User not found!");
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(422).send("Invalid password!");
            }

            const setting = await UserSecuritySetting.findOne({ id: user.id, email_verified: true });
            if (!setting) {
                return res.status(422).send("Unverified email!");
            }

            req.user = user;
            next();
        } catch (error) {
            LOGGER.APP.error("Error in preLoginAccess:", error);
            return res.status(500).send(error.message);
        }
    }
}

export default AuthMiddleware;
