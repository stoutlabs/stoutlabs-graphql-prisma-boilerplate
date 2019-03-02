import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../../src/prisma";

const userOne = {
  input: {
    name: "Bob Marley",
    email: "bob.marley@example.com",
    password: bcrypt.hashSync('abcd1234')
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: "Eric Cartman",
    email: "eric.cartman@example.com",
    password: bcrypt.hashSync('testing12')
  },
  user: undefined,
  jwt: undefined
};

const seedDB = async () => {
  // Remove old test data
  await prisma.mutation.deleteManyUsers();

  // Create new user
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create a second user
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDB as default, userOne, userTwo };