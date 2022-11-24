import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getUsers: () => prisma.user.findMany(),
    getUser: async (_, args) =>
      prisma.user.findUnique({ where: { id: args.id } }),
    getLorePages: () => prisma.lorePage.findMany(),
    getLorePage: (_, { id }) =>
      prisma.lorePage.findUnique({
        where: { id: parseInt(id) },
      }),
  },
  Mutation: {
    createLorePage: async (
      _,
      { title, content, authorId, image, published = false }
    ) => {
      try {
        return prisma.lorePage.create({
          data: {
            title,
            content,
            image,
            authorId,
            published,
          },
        });
      } catch (error) {
        throw error;
      }
    },
  },
};
