import 'cross-fetch/polyfill';
import { gql } from "apollo-boost";

import getClient from "./utils/getClient";
import prisma from "../src/prisma";
import seedDB, { userOne } from "./utils/seedDB";
import { createUser, login, getUsers, getProfile } from "./utils/operations";

const client = getClient();

beforeEach(seedDB);


// Test Cases
test('Should create a new user', async () => {
  const variables = {
    data: {
      name: "Bobo",
      email: "bobo@example.com",
      password: "abcd1234"
    }
  }

  const response = await client.mutate({
    mutation: createUser,
    variables
  });

  const userExists = await prisma.exists.User({ id: response.data.createUser.user.id });

  expect(userExists).toBe(true);

});

test("Should expose public author profiles", async () => {
  const response = await client.query({ query: getUsers });

  expect(response.data.users.length).toBe(2);
  expect(response.data.users[ 0 ].email).toBe('(hidden)');
  expect(response.data.users[ 0 ].name).toBe('Bob Marley');
});

test("Should not login with bad credentials", async () => {
  const variables = {
    data: {
      email: "no@example.com",
      password: "adadfsssfsf"
    }
  }

  await expect(
    client.mutate({ mutation: login, variables })
  ).rejects.toThrow();
});

test("Should not allow signup with duplicate email.", async () => {
  const variables = {
    data: {
      name: "Tim Horton",
      email: "bob@babylon.com",
      password: "testpass"
    }
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test("Should not allow signup with short password.", async () => {
  const variables = {
    data: {
      name: "Short Pass Guy",
      email: "short@nope.com",
      password: "short1"
    }
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test("Should fetch user profile", async () => {
  const client = getClient(userOne.jwt);
  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.email).toBe(userOne.user.email);

});

test("Should login and provide an auth token", async () => {
  const variables = {
    data: {
      email: userOne.user.email,
      password: "abcd1234"
    }
  }

  const { data } = await client.mutate({ mutation: login, variables });
  expect(data.login.token).toBeDefined();
});

test("Should reject 'me' query if not authenticated.", async () => {
  await expect(
    client.query({ query: getProfile })
  ).rejects.toThrow();
});

test("Should fetch own profile if authenticated.", async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: getProfile });
  expect(data.me.name).toBe(userOne.user.name);
});