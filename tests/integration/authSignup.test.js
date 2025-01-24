const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/db/models/user");

describe("POST /api/v1/auth/signup", () => {
  describe("Success Case", () => {
    beforeEach(async () => {
      await User.destroy({ where: { email: "signuptest@gmail.com" }, force: true });
    });

    it("should create a new user and return a token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .set("accept-language", "en")
        .send({
          userType: "1",
          firstName: "testFirstName",
          lastName: "testLastName",
          email: "signuptest@gmail.com",
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

    it("should return 400 if passwords do not match", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .set("accept-language", "en")
        .send({
          userType: "1",
          firstName: "testFirstName",
          lastName: "testLastName",
          email: "test@gmail.com",
          password: "test@123",
          confirmPassword: "test@456",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Passwords do not match");
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .set("accept-language", "en")
        .send({
          userType: "1",
          firstName: "testFirstName",
          lastName: "testLastName",
          email: "test@gmail.com",
          password: "test@123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('"Confirm Password" is required');
    });

    it("should return 400 if userType is invalid", async () => {
      const response = await request(app)
        .post("/api/v1/auth/signup")
        .set("accept-language", "en")
        .send({
          userType: "3",
          firstName: "testFirstName",
          lastName: "testLastName",
          email: "test@gmail.com",
          password: "test@123",
          confirmPassword: "test@123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('"User Type" must be one of [1, 2]');
    });
  });
});