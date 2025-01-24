// tests/integration/controllers/authController.integration.test.js

const request = require("supertest");
const app = require("../../../src/app");
const User = require("../../../src/db/models/user");

describe("POST /api/v1/auth/signup", () => {
  describe("Success Case", () => {

    beforeEach(async () => {
      await User.destroy({ where: { email: "test@gmail.com" }, force: true });
    });

    it("should create a new user and return a token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .set("accept-language", "en")
        .send({
          userType: "1",
          firstName: "testFirstName",
          lastName: "testLastName",
          email: "test@gmail.com",
          password: "test@123",
          confirmPassword: "test@123",
        });

      expect(response.status).toBe(201);
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe("Error Cases", () => {
    it("should return 400 for invalid input (in English)", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .set("accept-language", "en")
        .send({
          userType: "1",
          firstName: "testFirstName",
          lastName: "testLastName",
          email: "invalid-email",
          password: "test@123",
          confirmPassword: "test@123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"Email" must be a valid email');
    });
  });
});
