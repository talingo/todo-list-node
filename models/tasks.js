const Task = require('./task')


class Tasks {
    _list = {};

    get arrList(){

        const list = [];

        Object.keys(this._list).forEach(key =>{
            const task = this._list[key];
            list.push(task);
        })

        return list
    }

    constructor(){
        this._list = {};
    }

    loadTasksFromArray( tasks = []){

        tasks.forEach(task =>{
            this._list[task.id] = task;

        })
    }

    createTask(description = ''){
        const task = new Task(description);
        this._list[task.id] = task;
    }

    allTasksList(){
        
        console.log();
        this.arrList.forEach((task, i) =>{

            const index = `${i+1}`.green;
            const {description, completedOn} = task
            const status = (completedOn) ? 'Completed'.green : 'Pending'.red;
            console.log(`${index}. ${description} :: ${status}`);
        })
        
    }
}

module.exports = Tasks