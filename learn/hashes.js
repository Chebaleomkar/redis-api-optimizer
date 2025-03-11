import { client, connect, disconnect } from "./basic-redis.js";

await connect(); 

// create an object in redis
await client.hSet("user:1001", { name: "Rushi", age: 20, email: "rushi@gmail.com" });
console.log("user profile stored");

// get all field
const userData = await client.hGetAll("user:1001");
console.log("user details:", userData);

// get specific field
const userEmail = await client.hGet("user:1001" , "email");
console.log("user email" , userEmail)

//update field
const updateEmail = await client.hSet("user:1001" , "email" , "r@gmail.com");
console.log("User Email update" , updateEmail);

// find fields( key-value pair)  count
const fieldcount = await client.hLen("user:1001");
console.log("Number of fields" , fieldcount);

// delete field
const deleteEmail = await client.hDel("user:1001" , "email");
console.log("Email deleted");

// check exists
const checkEmailExist = await client.hExists("user:1001" , "email");
console.log("Does email exist? " , checkEmailExist);

// increment numeric value
const incrementAge = await client.hIncrBy("user:1001" , "age" , 1);
console.log("Age incremented" , incrementAge);

const newUserData = await client.hGetAll("user:1001");
console.log("user details:", newUserData);


await client.del("user:1001");
await disconnect();