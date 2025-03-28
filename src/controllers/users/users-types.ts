import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type User = PrismaClient['user'];

export type GetMeResult = {
  user: User;
};

export enum GetMeError {
  BAD_REQUEST,
}


export type GetAllUsersResult = {
  users: User[];
};