import colors from "colors";
import { confirmAction, inquirerMenu, listTasks, listTasksCompleted, pause, readInput } from "./helpers/inquirer.js";
import { readDB, saveDatabase } from "./helpers/savefile.js";
import { Task } from "./models/task.js";
import { Tasks } from "./models/tasks.js";
// const {mostrarMenu, pause} = require("./helpers/messages");

const main = async() => 
{
    const tasks = new Tasks();
    
    const taskDB = readDB();
    if(taskDB)
    {
        tasks.loadTasksFromArray(taskDB);
    }

    let option = '';    
    do
    {
       option = await inquirerMenu();
        
        switch (option) 
        {
            case '1':
                const description = await readInput('Description: ');
                tasks.createTask(description);
                break;
            case '2':
                tasks.printFilteredTasks(true, true);
                break;
            case '3':
                tasks.printFilteredTasks(false, true);
                break;
            case '4':
                tasks.printFilteredTasks(true, false);
                break;
            case '5':
                const ids = await listTasksCompleted(tasks.listingArr);
                tasks.toggleCompleted(ids);
                break;
            case '6':
                const id = await listTasks(tasks.listingArr);
                if(id !== '0')
                {
                    const confirm = await confirmAction("Are you sure you want to delete this task?");
                    if(confirm)
                    {
                        tasks.eraseTask(id);
                        console.log("Tarea Borrada".green);
                    }
                }
                break;
        }

        saveDatabase(tasks.listingArr);

        await pause();
    }
    while(option !== '0')
}

main();