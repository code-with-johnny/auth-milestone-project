import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const catData = JSON.parse(fs.readFileSync("data/cat-data.json", "utf8"));
const userData = JSON.parse(fs.readFileSync("data/user-data.json", "utf8"));
const app = express();
const port = 8080;
const bcryptSaltRounds = 10;

// Don't use this logic in a production environment.
let userId = "";

app.use(cors());
app.use(express.json());

/* || UNPROTECTED ROUTES */

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

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendStatus(400);
  }

  const user = Object.values(userData).find((user) => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.sendStatus(401);
  }

  userId = user.id;

  return res.sendStatus(200);
});

app.post("/logout", (_, res) => {
  userId = "";
  return res.sendStatus(200);
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.sendStatus(400);
  }

  if (Object.values(userData).find((user) => user.email === email)) {
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

  userId = user.id;

  return res.sendStatus(200);
});

/* || PROTECTED ROUTES */

app.get("/who-am-i", withAuthenticationRequired, (req, res) => {
  const { username, role } = userData[userId];
  return res.send({ username, role });
});

/* || ADMIN ROUTES */

app.get("/admin/users", withAdminRoleRequired, (_, res) => {
  return res.send(Object.values(userData));
});

app.put("/admin/users/:user_id", withAdminRoleRequired, (req, res) => {
  const { user_id } = req.params;
  const { role } = req.body;

  if (!userData[user_id]) {
    return res.sendStatus(404);
  }

  userData[user_id].role = role;
  fs.writeFileSync("data/user-data.json", JSON.stringify(userData));

  return res.sendStatus(200);
});

app.delete("/admin/users/:user_id", withAdminRoleRequired, (req, res) => {
  const { user_id } = req.params;

  if (!userData[user_id]) {
    return res.sendStatus(404);
  }

  delete userData[user_id];
  fs.writeFileSync("data/user-data.json", JSON.stringify(userData));

  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Joseph The Cat API listening on port ${port}`);
});

// Utils

function withAuthenticationRequired(req, res, next) {
  const user = userData[userId];
  if (!user) return res.sendStatus(401);
  next();
}

function withAdminRoleRequired(req, res, next) {
  const user = userData[userId];
  if (!user) return res.sendStatus(401);
  if (user.role !== "admin") return res.sendStatus(403);
  next();
}
