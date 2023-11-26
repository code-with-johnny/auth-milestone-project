import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const mainUser = {
  id: uuidv4(),
  username: "Test",
  email: "j@j.com",
  password: bcrypt.hashSync("j", 10),
  role: "admin",
};

const generateUser = () => ({
  id: uuidv4(),
  username: faker.person.firstName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync("j", 10),
  role: Math.random() < 0.5 ? "user" : "admin",
});

const users = [mainUser, ...Array(50).fill(null).map(generateUser)];
const userData = Object.fromEntries(users.map((user) => [user.id, user]));

fs.writeFileSync("data/user-data.json", JSON.stringify(userData));
