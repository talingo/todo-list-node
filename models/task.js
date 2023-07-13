import { v4 as uuidv4 } from "uuid";

class Task {
  id = "";
  description = "";
  completedOn = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.completedOn = null;
  }
}

export default Task;
