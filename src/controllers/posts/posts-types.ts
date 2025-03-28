import type { Prisma } from "@prisma/client";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetPostsResult = {
  posts: Post[];
};

export type CreatePostResult = {
  newPost: Post;
};

export enum createPostError {
  UNKNOWN,
}