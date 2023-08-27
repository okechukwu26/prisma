import app from "../../app";
import supertest from "supertest";
import * as user from "../user"

describe("get", () => {
  it("should get", async () => {
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("live");
  });
});

describe("create a new user", () =>{
    it("it should create a user", async() =>{
        const req = {body:{username:"hello", password:"hi"}}
        const res = {json({token}) {
            expect(token).toBeTruthy()
        }}
        await user.createNewUser(req, res, ()=>{})
    })
})
