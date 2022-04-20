//Initialization
import fs from "fs/promises";


//Load data func
async function loadData() {
    const data = await fs.readFile("./users.json");
    console.log(JSON.parse(data));
    return JSON.parse(data);

    
}


//Run func
async function run() {
    let data = await loadData();

    const operation = process.argv[2];
    console.log(`Here's the operation you invoked: "${operation}"`);
    const incomingData = process.argv[3];
    console.log(`Here's the data you supplied: "${incomingData}"`);


    //Operation check
    if(operation === "add") {
        addUser (data, incomingData);
    }

    if(operation === "delete") {
        data = deleteUser(data, incomingData)
    }

console.log(`The "users.json" info will be replaced with: `);
console.log(data);
await savedata(data);
}

//Add user fun
function addUser (data, newUser) {
    const newId = data.reduce((a,c) => Math.max(a, c.id),0)+1
    data.push({id:newId, name:newUser});
}


//Delete user fun
function deleteUser (data, removeId) {
    return data.filter((user) => user.id !== parseInt(removeId));
}

//Savedata func
function savedata(data) {
return fs.writeFile("./users.json", JSON.stringify(data));
}

run();
