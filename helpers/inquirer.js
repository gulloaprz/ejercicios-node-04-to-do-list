import inquirer from "inquirer";
import colors from "colors";

const questions = 
[
    {
        type : "list",
        name : "option",
        message : "Qué desa hacer?",
        choices : 
        [
            {
                value : '1',
                name : `${'1.'.green} Crear tarea`,
            },
            {
                value : '2',
                name : `${'2.'.green} Listar tareas`,
            },
            {
                value : '3',
                name : `${'3.'.green} Listar tareas completadas`,
            },
            {
                value : '4',
                name : `${'4.'.green} Listar tareas pendientes`,
            },
            {
                value : '5',
                name : `${'5.'.green} Completar tarea(s)`,
            },
            {
                value : '6',
                name : `${'6.'.green} Borrar tarea(s)`,
            },
            {
                value : '0',
                name : `${'0.'.green} Salir`,
            },
        ]
    }
];


const inquirerMenu = async() =>
{
    console.clear();
    console.log("======================================".white);
    console.log("        Seleccione una opción".white);
    console.log("======================================\n".white);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => 
{
    const pauscnfg = 
    [
        {
            type : "input",
            name : "opcion",
            message : `Presione ${"ENTER".green} para continuar`,
        }
    ];
    await inquirer.prompt(pauscnfg);

    console.log("\n");
}

const readInput = async (message) =>
{
    const question = 
    [
        {
            type:"input",
            name:"description",
            message,
            validate(value)
            {
                if(value.trim().length === 0)
                {
                    return "Please enter a value";
                }

                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);

    return description;
}

const listTasks = async (data = []) => 
{
    const choices = data.map( (item,idx) => 
    {
        return {
            name : `${colors.green(idx + 1)}. ${item.description}`,
            value : item.id,
        };
    });

    choices.unshift({
        name:"0. Cancelar",
        value: "0"
    });

    const tasks = 
    [
        {
            type : "list",
            name : "id",
            choices
        }
    ];

    const { id } = await inquirer.prompt(tasks);
    return id;
}

const listTasksCompleted = async (data = []) => 
{
    const choices = data.map( (item,idx) => 
    {
        return {
            name : `${colors.green(idx + 1)}. ${item.description}`,
            value : item.id,
            checked : item.completedAt !== null
        };
    });

    const tasks = 
    [
        {
            type : "checkbox",
            name : "ids",
            choices
        }
    ];

    const { ids } = await inquirer.prompt(tasks);
    return ids;
}


const confirmAction = async(message) =>
{
    const question = 
    [
        {
            type:'confirm',
            name:'ok',
            message

        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

export
{
    inquirerMenu,
    pause,
    readInput,
    listTasks,
    listTasksCompleted,
    confirmAction
}