class Role {
    static CLIENT = { name: "Client", id: 1 };
    static STUDENT = { name: "Student", id: 2 };
    static TEACHER = { name: "Teacher", id: 3 };
    static ADMIN = { name: "Admin", id: 4 };

    static getValues() {
        return [this.CLIENT, this.STUDENT, this.TEACHER, this.ADMIN];
    }
}

module.exports = Role;
