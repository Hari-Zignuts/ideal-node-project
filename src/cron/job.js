const cron = require("node-cron");
const User = require("../db/models/user");
const Project = require("../db/models/project");

const { sendEmail } = require("../services/sendMail");

/**
 * @cron job to send emails to users
 * @description This cron job sends emails to users with their projects list
 * @runs Everyday at 7:00 AM
 */

const sendMailCron = cron.schedule("0 7 * * *", async () => {
  try {
    const batchSize = 10;
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      // Fetch users in batches of batchSize
      const users = await User.findAll({
        attributes: ["id", "email", "firstName", "lastName"],
        include: [
          {
            model: Project,
            attributes: ["title"], // Include only the title of projects
          },
        ],
        limit: batchSize, // Limit the number of users returned per batch
        offset, // Skip the first n users
      });

      // If no users are returned, break the loop
      if (users.length === 0) {
        hasMore = false;
        break;
      }

      // Send email to each user in the batch
      const emailPromises = users.map(async (user) => {
        const projects = user.dataValues.Projects.map(
          (project) => project.dataValues.title
        );
        await sendEmail(user.dataValues, projects);
      });

      // Wait for all emails to be sent before moving to the next batch
      await Promise.all(emailPromises);

      // Increment the offset to fetch the next batch
      offset += batchSize;
    }
  } catch (error) {
    console.log("error in cron job: ", error);
  }
});

module.exports = { sendMailCron };
