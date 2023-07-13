import "colors";

import {
  inquirerMenu,
  pause,
  readInput,
  deleteTasksList,
  confirm,
  showListAsChecklist,
} from "./helpers/inquirer.js";
import { saveDB, readDB } from "./helpers/FileCRUD.js";
import Tasks from "./models/tasks.js";

console.clear();
const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    //set tasks
    tasks.loadTasksFromArray(tasksDB);
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

      case "5":
        const ids = await showListAsChecklist(tasks.arrList);
        tasks.toggleCompletedTasks(ids);
        break;

      case "6":
        const id = await deleteTasksList(tasks.arrList);
        if (id !== "0") {
          const confirmDeletion = await confirm("Delete this task?");
          if (confirmDeletion) {
            tasks.deleteTask(id);
            console.log("Task deleted");
          }
        }
        break;
    }

    saveDB(tasks.arrList);

    await pause();
  } while (opt !== "0");
  pause();
};
main();
