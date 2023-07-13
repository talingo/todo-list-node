import Task from "./task.js";

class Tasks {
  _list = {};

  get arrList() {
    const list = [];

    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(description = "") {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  allTasksList() {
    console.log();
    this.arrList.forEach((task, i) => {
      const index = `${i + 1}`.green;
      const { description, completedOn } = task;
      const status = completedOn ? "Completed".green : "Pending".red;
      console.log(`${index}. ${description} :: ${status}`);
    });
  }

  listPendingCompleted(completed = true) {
    console.log();
    let index = 0;
    this.arrList.forEach((task) => {
      const { description, completedOn } = task;
      const status = completedOn ? "Completed".green : "Pending".red;

      if (completed && completedOn) {
        index += 1;
        console.log(`${index.green}. ${description} :: ${completedOn.green}`);
      } else if (!completed && !completedOn) {
        index += 1;
        console.log(`${index.green}. ${description} :: ${status}`);
      }
    });
  }
  toggleCompletedTasks(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedOn) {
        task.completedOn = new Date().toISOString();
      }
    });

    this.arrList.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedOn = null;
        task.completedOn = null;
      }
    });
  }
}
export default Tasks;
