import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import fs from "fs";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

const catData = JSON.parse(fs.readFileSync("data/cat-data.json", "utf8"));
const userData = JSON.parse(fs.readFileSync("data/user-data.json", "utf8"));
const app = express();
const port = 8080;
const bcryptSaltRounds = 10;

app.use(
  session({
    secret: "super secret key",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(cors());
app.use(express.json());

app.get("/cat-data", (_, res) => res.send(catData));

app.post("/email-subscribe", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Joseph The Cat API listening on port ${port}`);
});
