import amqplib from "amqplib";

async function consumeMail() {
  try {
    const connection = await amqplib.connect(
      "amqp://admin:admin@localhost:5672/"
    );
    const channel = await connection.createChannel();
    //need the queue name to consume the message from the queue
    const queue = "mail_queue";

    await channel.assertQueue(queue, { durable: false });

    //consume message from the queue
    channel.consume(queue, (message) => {
      if (message !== null) {
        const mailData = JSON.parse(message.content.toString());
        console.log("Received mail data:", mailData);
        //acknowledge the message
        channel.ack(message);
      }
    });

    //close the connection after some time to allow the consumer to receive messages
    setTimeout(() => {
      connection.close();
    }, 10000); //close after 10 seconds
  } catch (error) {
    console.error("Error consuming mail:", error);
  }
}

consumeMail();
