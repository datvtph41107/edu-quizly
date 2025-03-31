const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        role_permission_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RolePermission",
        },
        userSecuritySetting: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserSecuritySetting",
        },
    },
    { timestamps: true },
);
const User = mongoose.model("User", userSchema);

module.exports = User;
