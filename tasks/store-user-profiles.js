import { client, connect, disconnect } from "../example/basic-redis.js";

await connect();
const prefix = "User:10"
let users = [] ;
for(let i=1 ; i<5 ; i++){
    await client.hSet(`${prefix}${i}` , {name : `user ${i}` , age : 20 , email : `user${i}@gmail.com`});
    users.push(`prefix${i}`);
}

const getAllUsers =async () =>{
    for(const id of users){
        const users = await client.hGetAll(`${prefix}${id}`);
        console.log(`User ${id}` , users);
    }
}

const getUserById =async(id)=>{
    const user = await client.hGetAll(`${prefix}${id}`);
    if (!user || Object.keys(user).length === 0) { 
        console.log("❌ User Not Found");
        return;
    }
    console.log("User found" , user);
}

const getUserByName = async(name) =>{
    let found = false;

    for(let i=1;i<users.length;i++){
        const user = await client.hGetAll(`${prefix}${i}`);
        if(user.name === name){
            console.log("user found" , user);
            found = true;
            break;
        }        
    }
    if(!found){
        console.log("user not found");
    }
}

await getAllUsers();
await getUserById(1)
await getUserByName('user 10')

await disconnect();
