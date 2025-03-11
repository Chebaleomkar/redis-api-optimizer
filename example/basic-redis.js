import { createClient } from "redis";

const client = createClient();

client.on('error' , (err) => console.log("Redis Error" , err))

async function run(){
    await client.connect();
    console.log("Connected to Redis")

    await client.set("message" , "hello redis !");

    const value = await client.get('message');
    console.log("Retrieved from redis" , value);

    await client.disconnect();
}

run();