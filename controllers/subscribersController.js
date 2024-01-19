const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");
const emailSenderConfiguration = require("../config/nodemailer/configEmailTransporter");
const sendMailToSubscriber = require("../config/nodemailer/sendMail");

const createSubscriber = async (req, res) => {
  const { name, email } = req.body;

  // still to add email validation

  if (!name || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailAlreadyExists = await Subscriber.findOne({ email }).lean().exec();
  if (emailAlreadyExists) {
    return res.status(409).json({
      message: `The email ${email} is already associated with the subscription plan. Choose another one or check for errors.`,
    });
  }

  const actualSubscriber = await Subscriber.create({ name, email });
  if (!actualSubscriber) {
    return res.status(400).json({
      message: "There was an error. Try agaian",
    });
  }

  // send email if stored in db
  const transporter = nodemailer.createTransport(emailSenderConfiguration);
  sendMailToSubscriber(transporter, process.env.EMAIL, email, name, res);
};

module.exports = createSubscriber;
