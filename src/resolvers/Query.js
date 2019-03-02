import getUserId from "../utils/getUserId";

const Query = {
  users(parent, args, { prisma }, info) {
    const qArgs = {
      first: args.first,
      skip: args.skip
    };

    if (args.query) {
      qArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      }
    }

    return prisma.query.users(qArgs, info);
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const me = await prisma.query.user({
      where: {
        id: userId
      }
    });

    return me;
  }
};

export { Query as default };