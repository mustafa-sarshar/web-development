const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = { Employee };