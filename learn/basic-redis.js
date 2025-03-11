import { createClient } from "redis";

export const client = createClient();

client.on('error' , (err) => console.log("Redis Error" , err))

export const  connect = async() =>{
    await client.connect();
    console.log("Connected to Redis")
}

export const  disconnect =async() =>{
    await client.disconnect();
    console.log("Disconnect to redis");
}
