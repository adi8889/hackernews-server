
import type { Prisma } from "@prisma/client";

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  postId: string;
  userId: string;
}; // Define the Comment type manually based on your database schema

export type GetCommentsResult = {
  comments: Comment[];
};

export type CreateCommentResult = {
  comment: Comment;
};

export type UpdateCommentResult = {
  comment: Comment;
};
