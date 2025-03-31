import LOGGER from "../utils/logger";
const UserServices = require("../services/UserServices");

exports.getUser = async (req, res) => {
    LOGGER.APP.info("USER data: " + JSON.stringify(req.user));
    const response = await UserServices.getUser(req);
    return res.status(response.code).send(response);
};
