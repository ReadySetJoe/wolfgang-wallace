import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await prisma.user.findMany();
        console.log("users", users);
        return users;
      } catch (error) {
        throw error;
      }
    },
    getUser: async (_, args) => {
      try {
        const user = await prisma.user.findUnique({ where: { id: args.id } });
        console.log("user", user);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createLorePage: async (
      _,
      { title, content, authorId, published = false }
    ) => {
      try {
        return prisma.page.create({
          data: {
            title,
            content,
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
