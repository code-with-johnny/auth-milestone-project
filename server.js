import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import fs from "fs";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import {
  withAuthenticationRequired,
  withAdminRoleRequired,
} from "./server-utils.js";

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

app.get("/cat-data", withAuthenticationRequired, (_, res) => {
  return res.send(catData);
});

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

app.get("/who-am-i", withAuthenticationRequired, (req, res) => {
  const { username } = userData.find((user) => user.id === req.session.userId);
  return res.send(username);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendStatus(400);
  }

  const user = userData.find((user) => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.sendStatus(401);
  }

  req.session.userId = user.id;

  return res.sendStatus(200);
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  return res.sendStatus(200);
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.sendStatus(400);
  }

  if (userData.find((user) => user.email === email)) {
    return res.sendStatus(409);
  }

  const hashedPassword = bcrypt.hashSync(password, bcryptSaltRounds);
  const id = uuidv4();
  const user = {
    id,
    username,
    email,
    password: hashedPassword,
    role: "user",
  };

  userData[id] = user;
  fs.writeFileSync("data/user-data.json", JSON.stringify(userData));

  req.session.userId = user.id;

  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Joseph The Cat API listening on port ${port}`);
});
