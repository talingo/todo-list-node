require("colors");

const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/FileCRUD");
const Tasks = require("./models/tasks");

console.clear();

const main = async () => {
  
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB){
    //set tasks
    tasks.loadTasksFromArray(tasksDB)
  }

  do {
    // prints the menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const description = await readInput("Description:");
        tasks.createTask(description);
        console.log(description);
        break;

      case "2":
        tasks.allTasksList();
      break;

      case "3":
        tasks.listPendingCompleted(true);
        break;

      case "4":
        tasks.listPendingCompleted(false);
      break;
    }

    saveDB( tasks.arrList )

    await pause();
  } while (opt !== "0");
  //   pause();
};

main();
