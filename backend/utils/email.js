const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.email.split(' ')[0];
    this.url = url;
    this.from = `Radoslaw Dabrowski <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } =
      process.env;

    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
      // Active in gmail "less secure app" option
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      subject,
      firstName: this.firstName,
      url: this.url,
    });

    // 2) Define options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 3) Create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }
}

module.exports = Email;
