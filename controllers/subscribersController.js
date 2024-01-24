const nodemailer = require("nodemailer");
const validator = require("validator");
const Subscriber = require("../models/Subscriber");
const emailSenderConfiguration = require("../config/nodemailer/configEmailTransporter");
const sendMailToSubscriber = require("../config/nodemailer/sendMail");
const obscureEmail = require("../config/nodemailer/obscureEmail");

const createSubscriber = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // email validation example (basic testing)
  const emailIsValid = validator.isEmail(email);
  if (!emailIsValid) {
    return res
      .status(400)
      .json({ success: false, message: "Email is invalid. Try again" });
  }

  // obscure email
  let obscuredEmail = obscureEmail(email);

  const emailAlreadyExists = await Subscriber.findOne({ email }).lean().exec();
  if (emailAlreadyExists) {
    return res.status(409).json({
      success: false,
      message: `The email <${obscuredEmail}> is already associated with the subscription plan. Choose another one or check for errors`,
    });
  }

  const actualSubscriber = await Subscriber.create({ name, email });
  if (!actualSubscriber) {
    return res.status(400).json({
      success: false,
      message: "There was an error. Try again",
    });
  }

  // send email if stored in db
  const transporter = nodemailer.createTransport(emailSenderConfiguration);
  sendMailToSubscriber(
    transporter,
    process.env.EMAIL,
    email,
    obscuredEmail,
    name,
    res
  );
};

module.exports = createSubscriber;
