const sendMailToSubscriber = async (
  transporter,
  senderAddress,
  receiverAddress,
  receiverName,
  response
) => {
  try {
    await transporter.sendMail({
      from: {
        name: "Famous Cake",
        address: senderAddress,
      },
      to: receiverAddress,
      subject: `Welcome, ${receiverName}`,
      html: `<p>Dear ${receiverName}, we are glad you decided to subscribe to our wonderful weekly newsletter. A lot of useful information will knock at your door: be ready to open it</p>`,
    });
    response.status(201).json({
      message: `Thanks for subscribing, ${receiverName}. You should check your email <${receiverAddress}>.`,
    });
  } catch (err) {
    response
      .status(400)
      .json({ message: "Invalid data. Please, fill in the form properly." });
  }
};

module.exports = sendMailToSubscriber;
