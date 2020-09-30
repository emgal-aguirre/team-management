// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };
    //managers have an office number and is a point on contact and needs to added the card.
    getOfficeNumber() {
        return (this.officeNumber);
    };

    getRole() {
        return "Manager";
    };
};

module.exports = Manager;
