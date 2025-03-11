import { createClient } from "redis";

const subscriber = createClient();

await subscriber.connect();

const channel = "notification";

await subscriber.subscribe(channel , (message) =>{
    console.log("Received" , message);
})