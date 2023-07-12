const pug = require("pug");
const path = require("path");
const { convert } = require("html-to-text");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = "lordferro@gmail.com";
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "views", "emails", `${template}.pug`),
      {
        name: this.name,
        url: this.url,
        subject,
      }
    );
    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await sgMail.send(emailConfig);
  }

  async sendHello() {
    await this._send("hello", "Verifying mail.");
  }

  async sendRestorePassword() {
    await this._send("passreset", "Password reset instruction");
  }
}

module.exports = Email;
