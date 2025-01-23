require("dotenv").config({ path: `${process.cwd()}/.env` });
const http = require("http");
const app = require("./app");

// create server
const server = http.createServer(app);

// server listening
const PORT = process.env.APP_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// server error handling
server.on("error", (error) => {
  console.log("Error in server: ", error);
});