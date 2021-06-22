const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const Role = require('../../_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

module.exports = {
    authenticate,
};

async function authenticate({ username, password }) {
    const employee = users.find(u => u.username === username && u.password === password);
    if (employee) {
        const token = jwt.sign({ sub: employee.id, role: employee.role }, config.secret);
        console.log(token)
        const { password, ...userWithoutPassword } = employee;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

