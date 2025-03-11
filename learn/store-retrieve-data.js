import { client, connect } from "./basic-redis.js";

await connect();

await client.set("username" ,"rushi");
console.log("value stored")


const username = await client.get("username")
console.log("value get " ,username);

const exists = await client.exists('username');
console.log('🔍 Key exists:', exists);

await client.del('username');
console.log('🗑️ Key deleted')
