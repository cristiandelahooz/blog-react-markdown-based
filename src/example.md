# Parallel and Distributed Programming

This document provides an in-depth explanation of parallel and distributed programming concepts, along with practical examples using Java threads, RabbitMQ, and clusters.

---

## 1. What is Parallel Programming?

Parallel programming is the process of executing multiple tasks simultaneously on multiple processors or cores within a single machine. It is commonly used to improve performance by dividing a large task into smaller subtasks that can run concurrently.

### Key Concepts in Parallel Programming

- **Thread**: A lightweight process that runs within a program. Multiple threads can run concurrently in a single program.
- **Concurrency**: The ability to execute multiple tasks at the same time, but not necessarily simultaneously (e.g., time-slicing).
- **Parallelism**: The simultaneous execution of tasks on multiple processors or cores.

### Example: Using Threads in Java

The following example demonstrates how to use Java threads to perform parallel computation.

```java
public class ThreadExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            System.out.println("Thread 1 is running");
        });

        Thread thread2 = new Thread(() -> {
            System.out.println("Thread 2 is running");
        });

        thread1.start();
        thread2.start();
    }
}
```

In this example:

- Two threads (`thread1` and `thread2`) are created and started.
- Each thread executes its task independently.

---

## 2. What is Distributed Programming?

Distributed programming involves executing tasks across multiple machines connected via a network. It is used to build scalable and fault-tolerant systems.

### Key Concepts in Distributed Programming

- **Message Passing**: Communication between distributed components using messages.
- **Cluster**: A group of interconnected machines (nodes) that work together as a single system.
- **Fault Tolerance**: The ability of a system to continue functioning even when some components fail.

---

## 3. RabbitMQ: A Distributed Messaging System

RabbitMQ is a message broker that facilitates communication between distributed systems. It uses the **publish/subscribe** model to send and receive messages.

### Key Components of RabbitMQ

- **Producer**: Sends messages to a queue.
- **Queue**: A buffer that stores messages until they are consumed.
- **Consumer**: Retrieves messages from a queue.

### Example: Sending and Receiving Messages with RabbitMQ

#### Producer (Sender)

```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Producer {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            String message = "Hello, World!";
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}
```

#### Consumer (Receiver)

```java
import com.rabbitmq.client.*;

public class Consumer {
    private final static String QUEUE_NAME = "hello";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), "UTF-8");
                System.out.println(" [x] Received '" + message + "'");
            };
            channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
        }
    }
}
```

---

## 4. Clusters in Distributed Systems

A **cluster** is a group of interconnected machines (nodes) that work together to perform tasks. Clusters are commonly used in distributed systems to achieve scalability and fault tolerance.

### Key Features of Clusters

- **Load Balancing**: Distributing tasks evenly across nodes.
- **High Availability**: Ensuring the system remains operational even if some nodes fail.
- **Scalability**: Adding more nodes to handle increased workload.

---

## 5. Combining Parallel and Distributed Programming

In real-world applications, parallel and distributed programming are often combined. For example:

- Use threads for parallel computation within a single machine.
- Use RabbitMQ to distribute tasks across multiple machines in a cluster.

### Example: Distributed Task Processing

1. **Producer**: Sends tasks to a RabbitMQ queue.
2. **Consumers**: Multiple consumers retrieve tasks from the queue and process them in parallel using threads.

#### Consumer with Thread Pool

```java
import com.rabbitmq.client.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadedConsumer {
    private final static String QUEUE_NAME = "tasks";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

            ExecutorService executor = Executors.newFixedThreadPool(3);

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                executor.submit(() -> {
                    String message = new String(delivery.getBody(), "UTF-8");
                    System.out.println(" [x] Processed '" + message + "' by " + Thread.currentThread().getName());
                });
            };
            channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
        }
    }
}
```

---

## 6. Conclusion

Parallel and distributed programming are essential for building high-performance and scalable systems. By combining Java threads, RabbitMQ, and clusters, you can create robust applications that handle large workloads efficiently.

---

## 7. References

- [Java Concurrency Documentation](https://docs.oracle.com/javase/tutorial/essential/concurrency/)
- [RabbitMQ Official Documentation](https://www.rabbitmq.com/documentation.html)
- [Distributed Systems Concepts](https://en.wikipedia.org/wiki/Distributed_computing)
