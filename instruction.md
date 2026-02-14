# 🐰 RabbitMQ Docker Setup Guide

This guide explains how to:

1. Create a Dockerfile for RabbitMQ
2. Build a Docker image
3. Run a container
4. Verify it is running
5. Connect from a Node.js application
6. Enable persistent storage

---

# 1️⃣ Create Dockerfile

Create a file named:

```
Dockerfile
```

Add the following content:

```dockerfile
# This Dockerfile sets up a RabbitMQ server with the management plugin enabled.
FROM rabbitmq:3.13-management

# Set environment variables for default user and password
ENV RABBITMQ_DEFAULT_USER=admin
ENV RABBITMQ_DEFAULT_PASS=admin

# Expose required ports
# 5672 = AMQP
# 15672 = Management UI
EXPOSE 5672 15672

# Start RabbitMQ server
CMD ["rabbitmq-server"]
```

---

# 2️⃣ Build the Docker Image

Make sure you are inside the same folder as the Dockerfile.

```bash
docker build -t docker-rabbitmq .
```

Explanation:

- `-t docker-rabbitmq` → Name of the image
- `.` → Build using current directory

---

# 3️⃣ Run the Container

Basic run command:

```bash
docker run -d --name rabbitmq-docker -p 5672:5672 -p 15672:15672 docker-rabbitmq
```

### Command Syntax:

```
docker run -d --name containerName -p localPort:containerPort imageName
```

Alternative formatted version:

```bash
docker run -d \
  --name rabbitmq-local \
  -p 5672:5672 \
  -p 15672:15672 \
  docker-rabbitmq
```

Explanation:

- `-d` → Run in detached mode
- `--name` → Container name
- `-p` → Port mapping
- `5672` → AMQP port
- `15672` → Management UI port

---

# 4️⃣ Verify Container is Running

Check running containers:

```bash
docker ps
```

You should see your container with a Container ID.

---

# 5️⃣ Access Management UI

Open your browser:

```
http://localhost:15672
```

Login:

```
Username: admin
Password: admin
```

---

# 6️⃣ Connect from Node.js

In your Node.js app:

```javascript
amqp.connect("amqp://admin:admin@localhost:5672");
```

---

# 🚀 Optional — Enable Persistent Storage

If you want messages to survive container restarts:

```bash
docker run -d \
  --name rabbitmq-local \
  -p 5672:5672 \
  -p 15672:15672 \
  -v rabbitmq_data:/var/lib/rabbitmq \
  docker-rabbitmq
```

Explanation:

- `-v rabbitmq_data:/var/lib/rabbitmq`
- Creates a Docker volume
- Stores RabbitMQ data outside the container

Now messages and queues will persist even if the container stops.

---

# ✅ Summary Flow

1. Create Dockerfile
2. Build image
3. Run container
4. Verify with `docker ps`
5. Access UI
6. Connect from application

You now have RabbitMQ running locally inside Docker 🚀
