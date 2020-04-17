const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
console.log(OUTPUT_DIR)
console.log(outputPath);

const render = require("./lib/htmlRenderer");

var teamArray =[]


function starterQ() {
  var questions = [
    {
      type: "list",
      name: "employeeType",
      message: "Are you an Engineer, a Intern, or a Manager?",
      choices: ["Engineer", "Intern", "Manager"],
    },
  ];

  inquirer.prompt(questions).then(function (answers) {
    console.log(answers);
    if (answers.employeeType === "Manager") {
      console.log("Ask Manager questions");
      askManagerQs();
    } else if (answers.employeeType === "Intern") {
      console.log("Ask Intern Questions");
      askInternQs();
    } else if (answers.employeeType === "Engineer") {
      console.log("Ask Engineer Questions");
      askEngineerQs();
    }
  });
}

starterQ();

function restartQ() {
  var questions = [
    {
      type: "confirm",
      name: "addAnother",
      message: "Would you like to add another empoloyee?",
    },
  ];
  inquirer.prompt(questions).then(function (answers) {
    console.log(answers);
    if (answers.addAnother === true){
        starterQ();
    }
    else {
     var finalProduct =  render(teamArray)
     fs.writeFile(outputPath, finalProduct, function(err) {
      console.log('this is err for final product', err)
     })
    }
  })
}

function askManagerQs() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "office",
      message: "What is your office number?",
    },
  ];
  inquirer.prompt(questions).then(function (answers) {
    var manager = new Manager (answers.name, answers.email, answers.office)
    console.log('this is the new manger we made!!',manager);
    teamArray.push(manager)
    restartQ()
  });
}

function askInternQs() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "school",
      message: "What is the name of your school?",
    },
  ];
  inquirer.prompt(questions).then(function (answers) {
    var intern = new Intern (answers.name, answers.email, answers.school)
    teamArray.push(intern)
    restartQ()
  });
}

function askEngineerQs() {
  var questions = [
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "github",
      message: "What is GitHub username?",
    },
  ];
  inquirer.prompt(questions).then(function (answers) {
    var engineer = new Engineer (answers.name, answers.email, answers.github)
    teamArray.push(engineer)
    restartQ()
  });
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be s0*3.ure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
