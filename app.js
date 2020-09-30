const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const team = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function employeeInfo() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of employee would you like to add?",
            name: "name",
            choices: ["Intern", "Engineer", "Manager", "Team Complete"],
        },
    ]).then(val => {
        if (val.name === "Intern") {
            internInfo();
        } else if (val.name === "Engineer") {
            engineerInfo();
        } else if (val.name === "Manager") {
            managerInfo();
        } else if (val.name === "Team Complete") {
            generateHTML(outputPath, render(team));
        };
    });
};

function managerInfo() {
    return inquirer.prompt([
        {
            message: "What is the manager's name?",
            name: "name"
        },
        {
            message: "What is the manager's id?",
            name: "id"
        },
        {
            message: "What is the manager's email?",
            name: "email"
        },
        {
            message: "What is the manager's ofice number?",
            name: "officeNumber"
        },
    ]).then(function (answer) {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
        team.push(manager);

        employeeInfo()
    })
};

function engineerInfo() {
    return inquirer.prompt([
        {
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            message: "What is the engineer's id?",
            name: "id"
        },
        {
            message: "What is the engineer's email?",
            name: "email"
        },
        {
            message: "What is the engineer's GitHub username?",
            name: "github"
        },
    ]).then(function (answer) {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        team.push(engineer);

        employeeInfo()
    })
};

function internInfo() {
    return inquirer.prompt([
        {
            message: "What is the intern's name?",
            name: "name"
        },
        {
            message: "What is the intern's id?",
            name: "id"
        },
        {
            message: "What is the intern's email?",
            name: "email"
        },
        {
            message: "What school does the intern go to?",
            name: "school"
        },
    ]).then(function (answer) {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        team.push(intern);

        employeeInfo()
    })
};

function generateHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("Perfect! Your team info is now complete!");
    });
};

employeeInfo();
