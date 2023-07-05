const request = require("supertest");

const app = require("../../server");

describe("POST /api/auth/login", () => {
  beforeAll(() => {
    console.log("before all");
    console.log(app);
  });

  it("should return unauth", async () => {
    const testData = {
      email: "habax@extemer.com",
      password: "123456",
    };

    const res = await request(app).post("/api/auth/login").send(testData);

    expect(res.statusCode).toBe(401);
  });

  it("should return unauth", async () => {
    const testData = {
      email: "habax26137@extemer.com"
    };

    const res = await request(app).post("/api/auth/login").send(testData);

    expect(res.statusCode).toBe(400);
  });

  it("should return token", async () => {
    const testData = {
      email: "habax26137@extemer.com",
      password: "123456",
    };

    const res = await request(app).post("/api/auth/login").send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
  });
});
