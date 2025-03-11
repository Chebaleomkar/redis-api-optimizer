# 🚀 Setting Up Redis with Docker

## **📌 Prerequisites**
Before you start, ensure you have the following installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/macOS)
- [Docker Engine](https://docs.docker.com/engine/install/) (Linux)
- `docker-compose` (Check with `docker-compose version`)

## **📌 Step 1: Verify Docker Installation**
To check if Docker is installed and running, execute:
```sh
docker info
```
If you get an error saying Docker is not running:
- **Windows/macOS:** Open **Docker Desktop** and ensure it's running.
- **Linux:** Start Docker manually:
  ```sh
  sudo systemctl start docker
  ```

## **📌 Step 2: Create a Docker Compose File**
Inside your project directory, create a file named **`docker-compose.yaml`** and add the following content:

```yaml
version: '3.8'

services:
  redis:
    image: redis:latest
    container_name: redis-container
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: ["redis-server", "--appendonly", "yes"]

volumes:
  redis_data:
    driver: local
```

## **📌 Step 3: Start Redis in Docker**
Run the following command to start Redis:
```sh
docker-compose up -d
```
✅ This will:
- Download and run the latest Redis container
- Expose Redis on **port 6379**
- Ensure data persistence with **volumes**

To verify the running container:
```sh
docker ps
```
You should see `redis:latest` running.

## **📌 Step 4: Connect to Redis CLI**
To open the Redis CLI inside the container:
```sh
docker exec -it redis-container redis-cli
```
Test Redis by running:
```sh
ping
```
✅ Expected Output: `PONG`

## **📌 Step 5: Test Redis Connection in Node.js**
Create a test script to verify Redis connectivity.

📄 **File:** `examples/basic-redis.js`
```js
import { createClient } from 'redis';

const client = createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});

client.on('error', (err) => console.error('Redis Error:', err));

async function run() {
    await client.connect();
    console.log('✅ Connected to Redis');

    await client.set('message', 'Hello from Docker Redis!');
    const value = await client.get('message');
    console.log('📌 Retrieved from Redis:', value);

    await client.disconnect();
}

run();
```

### **Run the Script:**
```sh
node examples/basic-redis.js
```
✅ Expected Output:
```
✅ Connected to Redis
📌 Retrieved from Redis: Hello from Docker Redis!
```

## **📌 Step 6: Stopping and Removing Redis Container**
To stop Redis:
```sh
docker-compose down
```
To remove all Redis data:
```sh
docker volume rm redis_data
```

## **🎯 Next Steps**
✅ **Setup Redis using Docker**  
✅ **Run Redis and verify the connection**  
✅ **Update Node.js code to use Redis in Docker**  
🔜 **Next: Learn Basic Redis Commands (`docs/02-basic-commands.md`)**  

🚀 Now you're ready to explore Redis deeper! 🎉

