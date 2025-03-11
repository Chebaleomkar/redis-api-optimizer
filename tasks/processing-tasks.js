import { client, connect, disconnect } from "../example/basic-redis.js";

await connect();

await client.del("taskQueue")

await client.rPush("taskQueue" , "git clone repo");
await client.rPush("taskQueue","run npm install" );
await client.rPush("taskQueue","start the docker" ) 
await client.rPush("taskQueue","run the scripts" );

while (await client.lLen("taskQueue") > 0) {
    const task = await client.lPop("taskQueue");
    console.log("✅ Processing Task:", task);
}
console.log("All tasks processed !");

await disconnect();;