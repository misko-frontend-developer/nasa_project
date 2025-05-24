const request = require("supertest");
const app = require("../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

<<<<<<< Updated upstream
describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "ZMT",
    rocket: "1111",
    destination: "Some destination",
    launchDate: "January 17, 2030",
  };
=======
  afterAll(async () => {
    await monogoDisconnect();
  });
  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "ZMT",
      rocket: "1111",
      destination: "Some destination",
      launchDate: "January 17, 2030",
      target: "Kepler-1652 b",
    };
>>>>>>> Stashed changes

  const launchDataWithoutDate = {
    mission: "ZMT",
    rocket: "1111",
    destination: "Some destination",
  };

  const launchDataWithoutInvalidDate = {
    mission: "ZMT",
    rocket: "1111",
    destination: "Some destination",
    launchDate: "zoot",
  };

<<<<<<< Updated upstream
  test("It should respond with 201 creted", async () => {
    try {
      const response = await request(app)
        .post("/launches")
        .send({
          mission: "ZMT",
          rocket: "1111",
          destination: "Some destination",
          launchDate: "January 17, 2030",
        })
=======
    test("It should respond with 201 creted", async () => {
      try {
        const response = await request(app)
          .post("/v1/launches")
          .send({
            mission: "ZMT",
            rocket: "1111",
            destination: "Some destination",
            launchDate: "January 17, 2030",
          })
          .expect("Content-Type", /json/)
          .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
      } catch (error) {
        console.log(error);
      }
    });

    test("It should check missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
>>>>>>> Stashed changes
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    } catch (error) {
      console.log(error);
    }
  });

  test("It should check missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required property",
    });
  });

<<<<<<< Updated upstream
  test("Check for invalid tests", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
=======
    test("Check for invalid tests", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);
>>>>>>> Stashed changes

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
