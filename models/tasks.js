/**
 * _listing:
 * {'uuid:12345-12315-2': {id:12, description:'Lorem ipsum', completedAt:4546}}
 */

import { Task } from "./task.js";
import color from "colors";

class Tasks
{
    _listing = {};

    constructor() 
    {
        this._listing = {};    
    }

    createTask(description = '')
    {
        const task = new Task(description);
        this._listing[task.id] = task;
    }

    get listingArr() 
    {
        return Object.keys(this._listing).map(i => this._listing[i]);
    }

    loadTasksFromArray(tasks = [])
    {
        tasks.forEach(task => {
            this._listing[task.id] = task; 
        });

        console.log("listing");
        console.log(this._listing);
    }

    printFilteredTasks(pending = true, completed = true)
    {
        console.log("======================================".white);
        console.log("               TASKS".white);
        console.log("======================================\n".white);

        let listing = this.listingArr;

        if(!pending || !completed)
             listing = listing.filter(t => (completed ? t.completedAt !== null : t.completedAt === null));

        listing.forEach((task, idx) => 
        {
            const { description, completedAt } = task;
            const status = completedAt != null ? `${'Completed'.bgGreen} (${color.green(task.completedAt)})`: 'Pending'.bgRed; 
            console.log(color.magenta(idx + 1), description, ' :: ', status);
        });
    }

    eraseTask(id = '')
    {
        if(this._listing[id]){
            delete this._listing[id];
        }
    }

    toggleCompleted(ids = [])
    {
        ids.forEach(id => {
            const task = this._listing[id];
            if(task.completedAt == null)
            {
                task.completedAt = new Date().toISOString();
            }
        });

        this.listingArr.forEach(task => 
        {
            if(!ids.includes(task.id))
            {
                this._listing[task.id].completedAt = null;
            }
        });
    }
}

export { Tasks }

