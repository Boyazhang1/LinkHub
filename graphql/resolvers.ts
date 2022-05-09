import prisma from '../lib/prisma';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { argsToArgsConfig } from 'graphql/type/definition';

export const resolvers = {
  Query: {
    // Prisma pagination docs: https://www.prisma.io/docs/concepts/components/prisma-client/pagination#use-cases-for-offset-pagination
    links: async (_, { first, after }, ctx) => {
      let queryResults = null;

      // check if there is a cursor as the argument
      if (after) {
        queryResults = await ctx.prisma.link.findMany({
          take: first, // number of itmes to return from db
          skip: 1, // skips cursor itself
          cursor: {
            id: after, // the cursor
          },
        });
      } else {
        // no cursor -> first request, return first items in db
        queryResults = await ctx.prisma.link.findMany({
          take: first,
        });
      }

      if (queryResults.length > 0) {
        // get last element in previous result set
        const lastLinkInResults = queryResults[queryResults.length - 1];

        const myCursor = lastLinkInResults.id;

        const secondQueryResults = await ctx.prisma.link.findMany({
          take: first,
          cursor: {
            id: myCursor,
          },
        });

        const result = {
          pageInfo: {
            endCursor: myCursor,
            hasNextPage: secondQueryResults.length >= first,
          },
          edges: queryResults.map((link) => ({
            cursor: link.id,
            node: link,
          })),
        };
        return result;
      }

      return {
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
        },
        edges: [],
      };
    },

  },

  Mutation: {
    deleteLink: async (_, { id }, ctx) => {
      return await ctx.prisma.link.delete({
        where: { id },
      });
    },
  },
};
