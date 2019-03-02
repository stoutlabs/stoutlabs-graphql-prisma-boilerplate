import bcrypt from "bcryptjs";

import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });

    if (!user) {
      throw new Error('Login incorrect...');
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error('Login incorrect.');
    }

    return {
      user,
      token: generateToken(user.id)
    }

  },
  async createUser(parent, args, { prisma }, info) {
    const emailExists = await prisma.exists.User({ email: args.data.email });

    if (emailExists) {
      throw new Error('Email already in use. Maybe you meant to sign in?');
    }

    const password = await hashPassword(args.data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    // Note: I didn't include an error handler after the first one...
    // Prisma will create generic error messages automatically. I just 
    // wanted to throw a manual error above to show how it can be done.
    const userId = getUserId(request);

    const user = await prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    }, info);
    return user;
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if(typeof args.data.password === "string"){
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data: args.data
    });
  }
};

export { Mutation as default };