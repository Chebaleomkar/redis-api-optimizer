import { createClient } from "redis";

const publisher = createClient();

await publisher.connect();

const channel = "notification";

setInterval(async()=>{
    const message = `New update at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString("en-US")}`;
    console.log("Publishing " , message);
    await publisher.publish(channel , message);

},3000);