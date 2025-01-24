const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/db/models/user");
const bcrypt = require("bcrypt");

describe("POST /api/v1/auth/login", () => {
  describe("Success Case", () => {
    beforeEach(async () => {
      await User.destroy({ where: { email: "logintest@gmail.com" }, force: true });
      await User.create({
        userType: "1",
        firstName: "testFirstName",
        lastName: "testLastName",
        email: "logintest@gmail.com",
        password: await bcrypt.hash("test@123", 10),
      });
    });

    it("should login a user and return a token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .set("accept-language", "en")
        .send({
          email: "logintest@gmail.com",
          password: "test@123",
        });

      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe("Error Cases", () => {
    it("should return 401 for invalid credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .set("accept-language", "en")
        .send({
          email: "test@gmail.com",
          password: "wrongpassword",
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should return 400 for invalid email format", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .set("accept-language", "en")
        .send({
          email: "invalid-email",
          password: "test@123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"Email" must be a valid email');
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .set("accept-language", "en")
        .send({
          email: "test@gmail.com",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('"Password" is required');
    });
  });
});