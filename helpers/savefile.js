import * as fs from "fs";
const file = "./database/data.json";

const saveDatabase = (data) => 
{
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB = () => 
{
    if(!fs.existsSync(file))
    {
        return null;
    }


    const info = fs.readFileSync(file, {encoding:"utf-8"});
    return JSON.parse(info);
}

export
{
    saveDatabase,
    readDB
}