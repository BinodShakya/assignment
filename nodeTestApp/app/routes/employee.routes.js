const authorize = require('../../_helpers/authorize')

module.exports = app => {
    const employees = require("../controllers/employee.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/employees/", authorize(), employees.create);

    router.post("/authenticate", employees.authenticate);

    // Retrieve all Tutorials
    router.get("/employees/", authorize(),employees.findAll);

    // Retrieve a single Tutorial with id
    router.get("/employees/:id", authorize(), employees.findOne);

    // Update a Tutorial with id
    router.put("/employees/:id", authorize(), employees.update);

    // Delete a Tutorial with id
    router.delete("/employees/:id", authorize(), employees.delete);

    // Delete all Tutorials
    router.delete("/employees/", authorize(), employees.deleteAll);

    app.use('/api/', router);
};
