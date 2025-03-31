const mongoose = require("mongoose");

const UserSecuritySettingSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "User",
        },
        email_verified: {
            type: Boolean,
            default: false,
        },
        email_verification_code: {
            type: String,
            default: null,
        },
        mail_register_created_at: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);
const UserSecuritySetting = mongoose.model("UserSecuritySetting", UserSecuritySettingSchema);

module.exports = UserSecuritySetting;
