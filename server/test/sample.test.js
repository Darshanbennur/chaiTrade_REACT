const request = require("supertest");
const { app } = require("../index");
const Blog = require("../models/Blog");

describe("API Entry Point", () => {
  test("Checking entry point of API", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});