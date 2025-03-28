
import type { Prisma } from "@prisma/client";

// Assuming 'Like' is a model in your Prisma schema, use Prisma.LikeCreateInput or adjust as needed.
type Like = {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
};

export type GetLikesResult = {
  likes: Like[];
};

export type CreateLikeResult = {
  like: Like ;
};
