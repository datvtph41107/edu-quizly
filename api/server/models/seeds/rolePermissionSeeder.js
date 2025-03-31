const RolePermission = require("../schema/RolePermission");
const Role = require("../../utils/role");

async function seedRolePermissions() {
    const count = await RolePermission.countDocuments();

    if (count === 0) {
        const rolePermissions = [
            {
                id: Role.CLIENT.id,
                name: Role.CLIENT.name,
                view_main: true,
                create_quiz_and_lessions: false,
                group_and_class: false,
                statistics: false,
            },
            {
                id: Role.STUDENT.id,
                name: Role.STUDENT.name,
                view_main: true,
                create_quiz_and_lessions: true,
                group_and_class: false,
                statistics: false,
            },
            {
                id: Role.TEACHER.id,
                name: Role.TEACHER.name,
                view_main: false,
                create_quiz_and_lessions: true,
                group_and_class: true,
                statistics: true,
            },
            {
                id: Role.ADMIN.id,
                name: Role.ADMIN.name,
                view_main: false,
                create_quiz_and_lessions: true,
                group_and_class: true,
                statistics: true,
            },
        ];

        await RolePermission.insertMany(rolePermissions);
        console.log("RolePermissions seeded!");
    } else {
        console.log("RolePermissions data already exists.");
    }
}

module.exports = seedRolePermissions;
