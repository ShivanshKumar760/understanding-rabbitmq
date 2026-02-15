import amqplib from "amqplib";

async function sendMail() {
  try {
    const connection = await amqplib.connect(
      "amqp://admin:admin@localhost:5672/"
    );
    const channel = await connection.createChannel();
    //set exhange name
    const exhange = "mail_exhange";
    const routingKey = "send_mail";

    //message body

    const message = {
      to: "mahimachatterjee.info@gmail.com",
      from: "shivanshkumar760@gmail.com",
      subject: "Test Mail",
      body: "This is a test mail from RabbitMQ",
    };

    //assert exchange
    //what is assert exchange? it is used to create an exchange if it does not exist
    await channel.assertExchange(exhange, "direct", { durable: false });

    //assert queue
    const queue = "mail_queue";
    await channel.assertQueue(queue, { durable: false });

    //bind queue to exchange
    await channel.bindQueue(queue, exhange, routingKey);

    //publish message to exchange
    channel.publish(exhange, routingKey, Buffer.from(JSON.stringify(message)));
    //why not await channel.publish? because it is not a promise, it is a synchronous function
    console.log("Message sent to RabbitMQ:", message);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

// sendMail(); //we can call the sendMail function here without await because it is an async function and we don't need to wait for it to complete before moving on to the next line of code.
//as we are not doing anything after sending the mail, we can just call the function without await.

async function main() {
  await sendMail();
}

main();
