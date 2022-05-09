import {Prisma, PrismaClient} from '@prisma/client'; 

// PrismaClient is attached to the global object in dev to prevent exhausting db connection limit
// To Read: https://pris.ly/d/help/next-js-best-practices
let prisma: PrismaClient; 

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(); 
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(); 
  }
  prisma = global.prisma;
}

export default prisma; 