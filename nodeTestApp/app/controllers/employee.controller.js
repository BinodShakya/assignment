const db = require("../models");
const Employee = db.employees;
const Op = db.Sequelize.Op;
const employeeService = require('../services/employee.service');


// Create and Save a new Tutorial
exports.create = (req, res) => {
// Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Username can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const employee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role ? req.body.role : "User",
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Employee.create(employee)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

    Employee.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Employee with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    if (req.body.published)
        req.body.role = "Admin"
    else
        req.body.role = "User"


    Employee.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employee was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Employee.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Employees were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Employees."
            });
        });
};

exports.authenticate = (req, res) => {
    employeeService.authenticate(req.body)
        .then(employee => employee ? res.json(employee) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Username or password incorrect."
            });
        });
};

