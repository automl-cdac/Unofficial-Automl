Here is a comprehensive guide to system design concepts, compiled from the resources you provided. This guide is structured to build your knowledge from fundamental principles to advanced architectural patterns.

### **1. The Core Components**

At the heart of any application is the **client-server model**. The **client** (e.g., your web browser or mobile app) requests information or services from a **server**, a powerful computer designed to run 24/7. This communication is made possible by a few key technologies:

* **IP Addresses and DNS**: Every device on the internet has a unique **IP address**. The **Domain Name System (DNS)** acts like the internet's phonebook, translating human-friendly domain names (like "google.com") into the IP addresses that computers use to find each other.
* **Proxy Servers**: A **proxy server** acts as an intermediary between a client and a server, while a **reverse proxy** sits in front of one or more servers, distributing client requests.

### **2. Building a Scalable System**

As an application grows, it needs to handle more users and data. This is where **scalability** comes in. There are two main approaches:

* **Vertical Scaling (Scaling Up)**: Increasing the resources (CPU, RAM) of a single server.
* **Horizontal Scaling (Scaling Out)**: Adding more servers to distribute the workload.

To effectively manage traffic in a horizontally scaled system, a **load balancer** is essential. It distributes incoming requests across multiple backend servers, preventing any single server from being overloaded.

### **3. Application & API Design**

* **Architectural Patterns**:
    * **Monolithic Architecture**: All features and functionalities are in a single codebase.
    * **Microservices Architecture**: The application is broken down into smaller, independent services that communicate with each other. This approach improves scalability and maintainability.
* **API (Application Programming Interface)**: An API defines how different software components should interact.
    * **API Paradigms**:
        * **REST (Representational State Transfer)**: A stateless architecture that uses standard HTTP methods.
        * **GraphQL**: A query language for APIs that allows clients to request exactly the data they need.
        * **gRPC**: A high-performance, open-source universal RPC framework.
    * **API Gateway**: A central service that acts as an entry point for all API requests, handling tasks like authentication, rate limiting, and routing.

### **4. Data Storage and Management**

* **Databases**:
    * **SQL (Relational) Databases**: Offer strong consistency and are suitable for structured data.
    * **NoSQL Databases**: Provide high scalability and flexible schemas, ideal for unstructured or semi-structured data.
* **Database Scaling and Performance**:
    * **Indexing**: Creates efficient lookup tables to speed up read queries.
    * **Replication**: Creates copies of a database to improve read performance and availability.
    * **Sharding (Horizontal Partitioning)**: Divides a database into smaller parts and distributes them across multiple servers.
    * **Vertical Partitioning**: Splits a database by columns to optimize queries.
* **Caching**: Storing frequently accessed data in a fast, in-memory database (like Redis) to reduce the load on the main database and improve response times.
* **Blob Storage**: Used for storing large, unstructured files like images and videos (e.g., Amazon S3).

### **5. Communication Protocols & Real-Time Interaction**

* **HTTP/HTTPS**: The foundation of data communication on the web. HTTPS provides a secure, encrypted connection.
* **WebSockets**: Enable continuous, two-way communication between clients and servers, essential for real-time applications.
* **WebRTC**: A peer-to-peer protocol suitable for real-time video and audio communication.
* **Message Queues**: Allow services to communicate **asynchronously**, decoupling them and improving scalability.
* **Publisher-Subscriber (Pub-Sub) Model**: An event-driven architecture where a single event can trigger actions across multiple services simultaneously.

### **6. System Reliability and Performance**

* **Key Performance Metrics**:
    * **Latency**: The delay in communication between two points.
    * **Throughput**: The number of requests or transactions a system can handle in a given time.
    * **Availability**: The percentage of time a system is operational.
* **Ensuring Reliability**:
    * **Fault Tolerance**: The ability of a system to continue operating even if some of its components fail.
    * **Redundancy**: Having duplicate components to take over if one fails.
    * **Rate Limiting**: Restricting the number of requests a client can make to prevent overload.
    * **Idempotency**: Ensuring that repeated requests have the same effect as a single request.
    * **Dead Letter Queue (DLQ)**: A queue where messages that fail to be processed are sent for later analysis and retries.
* **Content Delivery Network (CDN)**: A global network of servers that caches content closer to users, reducing latency and improving content delivery speed.
* **CAP Theorem**: A fundamental principle in distributed systems that states a system can only guarantee two of the following three properties: **Consistency**, **Availability**, and **Partition Tolerance**.