const sendMailToSubscriber = async (
  transporter,
  senderAddress,
  receiverAddress,
  obscuredReceiverAddress,
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
      success: true,
      message: `Thanks for subscribing, ${receiverName}. You should check your email <${obscuredReceiverAddress}>.`,
    });
  } catch (err) {
    response.status(400).json({
      success: false,
      message: "Invalid data. Please, fill in the form properly.",
    });
  }
};

module.exports = sendMailToSubscriber;
