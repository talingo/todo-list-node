import inquirer from "inquirer";
import "colors";

export const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "Select an option",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} Tasks list`,
      },
      {
        value: "3",
        name: `${"3.".green} Completed tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} Pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "0",
        name: `${"0.".green} Escape`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("========================".green);
  console.log("   Select an option".white);
  console.log("========================\n".green);

  const { option } = await inquirer.prompt(menuOptions);
  return option;
};

export const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"ENTER".green} to continue`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

export const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          ("Please enter a description");
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(question);
  return description;
};

export const deleteTasksList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${index} ${task.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Back to the Menu",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

export const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

export const showListAsChecklist = async ( tasks = [] ) => {

  const choices = tasks.map( (task, i) => {

   const index = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${index} ${task.description}`,
      checked: (task.completedOn) ? true : false
    };
  });

  // choices.unshift({
  //   value: "0",
  //   name: "0. ".green + "Back to the Menu",
  // });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};
