const
    { v4: uuidV4 } = require("uuid"),
    fs = require("fs"),
    path = require("path");

const employeesDB = {
    employees: require("../models/employees.json"),
    setEmployees: function (data) {
        this.employees = data;
    },
    addEmployee: function (first_name, last_name) {
        try {
            const newEmployee = {
                "_id": uuidV4(),
                "first_name": first_name,
                "last_name": last_name
            }
            this.setEmployees([...this.employees, newEmployee]);
            fs.writeFileSync(
                path.join(__dirname, "..", "models", "employees.json"),
                JSON.stringify(this.employees, null, "\t")
            );
            return {
                code: 201,      // Created new record
                message: JSON.stringify(newEmployee)
            }
        } catch (err) {
            return {
                code: 500,      // Created new record
                message: err.message
            }
        }
    },
    updateEmployee: function (_id, first_name, last_name) {
        try {
            const updateEmployee = this.employees.find((employee) => employee._id == _id);
            if (updateEmployee) {
                if (first_name) updateEmployee.first_name = first_name;
                if (last_name) updateEmployee.last_name = last_name;
                return {
                    code: 202,      // Accepted
                    message: JSON.stringify(updateEmployee)
                }
            } else {
                return {
                    code: 304,      // Not Modified
                    message: "Record not found!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    },
    deleteEmployee: function (_id) {
        try {
            const deleteEmployee = this.employees.find((employee) => employee._id == _id);
            if (deleteEmployee) {
                const employeesFiltered = this.employees.filter((employee) => employee._id != _id);
                this.setEmployees([...employeesFiltered]);
                return {
                    code: 200,      // Accepted
                    message: JSON.stringify(deleteEmployee)
                }
            } else {
                return {
                    code: 304,      // Not Modified
                    message: "Record not found!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    },
    getEmployee: function (_id) {
        try {
            const employee = this.employees.find((employee) => employee._id == _id);
            if (employee) {
                return {
                    code: 200,      // Accepted
                    message: JSON.stringify(employee)
                }
            } else {
                return {
                    code: 304,      // Not Modified
                    message: "Record not found!"
                }
            }
        } catch (err) {
            return {
                code: 500,      // Server internal error
                message: err.message
            }
        }
    }
};

const getAllEmployees = (req, res) => {
    res.json(employeesDB.employees);
}

const addNewEmployee = (req, res) => {
    const { first_name, last_name } = req.body;
    if (first_name && last_name) {
        const { code, message } = employeesDB.addEmployee(first_name, last_name);
        res.status(code)
            .send(message);
    } else {
        res.status(400)
            .json({
                "message": "First and last names are required!"
            });
    }
}

const updateEmployee = (req, res) => {
    const { _id, first_name, last_name } = req.body;
    if (_id) {
        if (first_name || last_name) {
            const { code, message } = employeesDB.updateEmployee(_id, first_name, last_name);
            res.status(code)
                .send(message);
        } else {
            res.status(400)
                .json({
                    "message": "At least first name or last name is required!"
                });
        }
    } else {
        res.status(400)
            .json({
                "message": "ID is required!"
            });
    }
}

const deleteEmployee = (req, res) => {
    const _id = req.body._id;
    if (_id) {
        const { code, message } = employeesDB.deleteEmployee(_id);
        res.status(code)
            .send(message);
    } else {
        res.status(400)
            .json({
                "message": "ID is required!"
            });
    }
}

const getEmployee = (req, res) => {
    const _id = req.params._id;
    const { code, message } = employeesDB.getEmployee(_id);
    res.status(code)
        .send(message);
}

module.exports = { getAllEmployees, addNewEmployee, updateEmployee, deleteEmployee, getEmployee }