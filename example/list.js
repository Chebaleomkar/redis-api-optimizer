import { client, connect } from "./basic-redis.js";

await connect();

// Clear the list before adding new elements

// Add elements to the list
await client.lPush("game", "cricket");
await client.lPush("game", "football");
await client.rPush("game", "hockey");

const game = await client.lRange("game", 0, -1);
console.log("Game List:", game);


//Check the length of the list
const length = await client.lLen("game");
console.log("Length of Game List:", length);

const lPop = await client.lPop("game");
console.log("Left pop" ,lPop)

const rPop = await client.rPop("game");
console.log("right pop" , rPop);


await client.del("game");