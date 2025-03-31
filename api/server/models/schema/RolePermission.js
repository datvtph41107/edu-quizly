const mongoose = require("mongoose");

const RolePermissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        view_main: {
            type: Boolean,
            default: false,
        },
        create_quiz_and_lessions: {
            type: Boolean,
            default: false,
        },
        group_and_class: {
            type: Boolean,
            default: false,
        },
        statistics: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);
const RolePermission = mongoose.model("RolePermission", RolePermissionSchema);

module.exports = RolePermission;
