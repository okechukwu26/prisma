import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handler/user";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  console.log("hello");
  res.status(200);
  res.json({ message: "live" });
});
app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "not authorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "Oops thats on us" });
  }
});
export default app;
