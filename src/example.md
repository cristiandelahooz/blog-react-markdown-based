---
title: Sakidoa example
author: Sakidoa
date: 2023-10-05
tags:
  - markdown
  - yaml
  - example
description: This is an example of a frontmatter in YAML format.
---

# Parallel and Distributed Programming

Este documento proporciona una explicación detallada de los conceptos de programación paralela y distribuida, junto con ejemplos prácticos avanzados usando Java (threads, RabbitMQ, clusters) y tablas comparativas para una comprensión profesional.

---

## 1. ¿Qué es la Programación Paralela?

La programación paralela consiste en ejecutar múltiples tareas simultáneamente en varios procesadores o núcleos dentro de una sola máquina. Se utiliza para mejorar el rendimiento dividiendo una tarea grande en subtareas más pequeñas que pueden ejecutarse en paralelo.

### Tabla Comparativa: Paralelismo vs Concurrencia

| Concepto     | Definición                                                                       | Ejemplo Práctico                            |
| ------------ | -------------------------------------------------------------------------------- | ------------------------------------------- |
| Paralelismo  | Ejecución simultánea de tareas en múltiples núcleos/procesadores                 | Procesamiento de imágenes en lote           |
| Concurrencia | Capacidad de gestionar múltiples tareas a la vez (no necesariamente simultáneas) | Servidor web manejando múltiples conexiones |

### Conceptos Clave en Programación Paralela

- **Thread (Hilo):** Proceso ligero que se ejecuta dentro de un programa. Varios hilos pueden correr en paralelo.
- **Concurrency (Concurrencia):** Capacidad de ejecutar varias tareas a la vez, aunque no necesariamente al mismo tiempo.
- **Parallelism (Paralelismo):** Ejecución simultánea de tareas en diferentes núcleos.

### Ejemplo Avanzado: Pool de Hilos en Java

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(4);

        for (int i = 1; i <= 8; i++) {
            int taskId = i;
            executor.submit(() -> {
                System.out.println("Ejecutando tarea " + taskId + " en " + Thread.currentThread().getName());
            });
        }

        executor.shutdown();
    }
}
```

**Explicación:**  
Este ejemplo crea un pool de 4 hilos y ejecuta 8 tareas, mostrando cómo se distribuyen las tareas entre los hilos disponibles.

---

## 2. ¿Qué es la Programación Distribuida?

La programación distribuida implica ejecutar tareas en varias máquinas conectadas por una red. Es fundamental para construir sistemas escalables y tolerantes a fallos.

### Tabla: Características de Sistemas Distribuidos

| Característica      | Descripción                                             | Ejemplo Real              |
| ------------------- | ------------------------------------------------------- | ------------------------- |
| Escalabilidad       | Capacidad de añadir más nodos para aumentar rendimiento | Clúster de servidores web |
| Tolerancia a fallos | El sistema sigue funcionando si un nodo falla           | Base de datos replicada   |
| Transparencia       | Oculta la complejidad de la red al usuario final        | Cloud computing           |

### Conceptos Clave en Programación Distribuida

- **Message Passing (Paso de Mensajes):** Comunicación entre componentes distribuidos mediante mensajes.
- **Cluster:** Grupo de máquinas interconectadas que trabajan como un solo sistema.
- **Fault Tolerance (Tolerancia a Fallos):** Capacidad de seguir funcionando ante fallos parciales.

---

## 3. RabbitMQ: Sistema de Mensajería Distribuida

RabbitMQ es un broker de mensajes que facilita la comunicación entre sistemas distribuidos usando el modelo **publish/subscribe**.

### Componentes Clave de RabbitMQ

| Componente | Descripción                                     |
| ---------- | ----------------------------------------------- |
| Producer   | Envía mensajes a una cola                       |
| Queue      | Almacena mensajes hasta que sean consumidos     |
| Consumer   | Recibe mensajes de la cola                      |
| Exchange   | Encaminador que distribuye mensajes a las colas |

### Ejemplo Avanzado: Productor y Consumidor con RabbitMQ

#### Productor (Sender)

```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Producer {
    private final static String QUEUE_NAME = "advanced_queue";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            for (int i = 1; i <= 5; i++) {
                String message = "Mensaje #" + i;
                channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
                System.out.println(" [x] Enviado '" + message + "'");
            }
        }
    }
}
```

#### Consumidor (Receiver) con Acknowledgement Manual

```java
import com.rabbitmq.client.*;

public class Consumer {
    private final static String QUEUE_NAME = "advanced_queue";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            System.out.println(" [*] Esperando mensajes. Para salir presiona CTRL+C");

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), "UTF-8");
                System.out.println(" [x] Recibido '" + message + "'");
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
            };
            channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> { });
        }
    }
}
```

---

## 4. Clústeres en Sistemas Distribuidos

Un **clúster** es un grupo de máquinas interconectadas que trabajan juntas para realizar tareas, logrando escalabilidad y alta disponibilidad.

### Tabla: Tipos de Clústeres

| Tipo de Clúster     | Propósito Principal               | Ejemplo                                 |
| ------------------- | --------------------------------- | --------------------------------------- |
| Alta Disponibilidad | Minimizar tiempo de inactividad   | Clúster de bases de datos               |
| Balanceo de Carga   | Distribuir tareas equitativamente | Servidores web detrás de un balanceador |
| Computación         | Procesamiento paralelo masivo     | Clúster de supercomputadoras            |

### Ejemplo: Balanceo de Carga con NGINX

```nginx
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }
}
```

---

## 5. Combinando Programación Paralela y Distribuida

En aplicaciones reales, se combinan ambos enfoques:

- Se usan hilos para procesamiento paralelo dentro de una máquina.
- Se usan colas de mensajes (como RabbitMQ) para distribuir tareas entre varias máquinas en un clúster.

### Ejemplo Avanzado: Procesamiento Distribuido con Pool de Hilos

#### Consumidor con Pool de Hilos

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
            System.out.println(" [*] Esperando tareas. Para salir presiona CTRL+C");

            ExecutorService executor = Executors.newFixedThreadPool(4);

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                executor.submit(() -> {
                    String message = new String(delivery.getBody(), "UTF-8");
                    System.out.println(" [x] Procesado '" + message + "' por " + Thread.currentThread().getName());
                });
            };
            channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> { });
        }
    }
}
```

---

## 6. Visualización: Arquitectura de un Sistema Distribuido

| Componente            | Descripción                       | Ejemplo de Tecnología    |
| --------------------- | --------------------------------- | ------------------------ |
| Balanceador de Carga  | Distribuye peticiones entre nodos | NGINX, HAProxy           |
| Nodo de Procesamiento | Ejecuta tareas paralelas          | Java ThreadPool, Node.js |
| Broker de Mensajes    | Intermedia la comunicación        | RabbitMQ, Kafka          |
| Almacenamiento        | Guarda datos compartidos          | MongoDB, PostgreSQL      |

```
[Cliente] -> [Balanceador de Carga] -> [Nodos de Procesamiento] <-> [Broker de Mensajes] <-> [Almacenamiento]
```

---

## 7. Conclusión

La programación paralela y distribuida es esencial para construir sistemas modernos, escalables y robustos. Combinando hilos, colas de mensajes y clústeres, puedes diseñar aplicaciones capaces de manejar grandes volúmenes de trabajo de manera eficiente y tolerante a fallos.

---

## 8. Referencias

- [Java Concurrency Documentation](https://docs.oracle.com/javase/tutorial/essential/concurrency/)
- [RabbitMQ Official Documentation](https://www.rabbitmq.com/documentation.html)
- [Distributed Systems Concepts](https://en.wikipedia.org/wiki/Distributed_computing)
- [NGINX Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
