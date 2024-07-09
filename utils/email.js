const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } =
    process.env;

  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
    // Active in gmail "less secure app" option
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Radoslaw Dabrowski <rdabrowski@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  // 3) Send the email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
