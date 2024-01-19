const emailSenderConfiguration = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PSW,
  },
  tls: { rejectUnauthorized: false },
};

module.exports = emailSenderConfiguration;
