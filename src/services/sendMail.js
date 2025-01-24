const nodemailer = require("nodemailer");
const ejs = require("ejs");
const { promisify } = require("util");
const path = require("path");

// Promisify the ejs.renderFile method to use async/await
const ejsRenderFile = promisify(ejs.renderFile);

// Set up your transport object (Mailtrap or other service)
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "46453d81789177",
    pass: "ed96b267873c58",
  },
});

/**
 * @function sendEmail
 * @description This function sends an email to the user with their projects list
 * @param {Object} user - The user object
 * @param {Array} projects - The list of projects
 * @returns {Promise} - A promise that resolves when the email is sent
 */

async function sendEmail(user, projects) {
  const templatePath = path.join(__dirname, "/../views/emailTemplate.ejs");
  const templateData = { user, projects };

  try {
    const html = await ejsRenderFile(templatePath, templateData); // Render EJS template

    const mailOptions = {
      from: '"Demo Sender" <noreply@demomailtrap.com>',
      to: user.email,
      subject: `Hello ${user.firstName}, here are your projects!`,
      html: html,
    };

    // Send email using the transport object
    await new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email to ${user.email}:`, error);
          reject(error);
        } else {
          console.log(`Email sent to ${user.email}: ${info.response}`);
          resolve(info);
        }
      });
    });
  } catch (err) {
    console.error("Error rendering EJS template or sending email:", err);
  }
}

module.exports = { sendEmail };
