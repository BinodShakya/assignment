module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        role: {
            type: Sequelize.STRING
        }
    });

    return Employee;
};
