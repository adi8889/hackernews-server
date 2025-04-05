import { prismaClient } from "../../extras/prisma";
import {
  createPostError,
  type CreatePostResult,
  type GetPostsResult,
} from "./posts-types";
export const getMePosts = async (parameters: {
  userId: string;
}): Promise<GetPostsResult> => {
  const rawPosts = await prismaClient.post.findMany({
    where: {
      userId: parameters.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const posts = rawPosts.map(post => ({
    ...post,
    updatedAt: post.updatedAT, // Correctly map updatedAT to updatedAt
  })).map(({ updatedAT, ...rest }) => rest); // Remove the incorrect property
  return {
    posts,
  };
};
export const getAllPosts = async (parameters: {
  page: number;
}): Promise<GetPostsResult> => {
  const limit = 10;
  const offset = (parameters.page - 1) * limit;
  const rawPosts = await prismaClient.post.findMany({
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });
  const posts = rawPosts.map(post => ({
    ...post,
    updatedAt: post.updatedAT, // Map updatedAT to updatedAt
  })).map(({ updatedAT, ...rest }) => rest); // Remove the incorrect property
  return { posts };
};
export const createPost = async (parameters: {
  userId: string;
  title: string;
  description?: string;
  content: string;
}): Promise<CreatePostResult> => {
  try {
    const newPost = await prismaClient.post.create({
      data: {
        userId: parameters.userId,
        title: parameters.title,
        description: parameters.description,
        content: parameters.content,
        updatedAT: new Date(), // Ensure updatedAT is explicitly set
      },
    });
    return { newPost: { ...newPost, updatedAt: newPost.updatedAT } };
  } catch (e) {
    throw createPostError.UNKNOWN;
  }
};
export const deletePost = async (parameters: {
  userId: string;
  postId: string;
}) => {
  const post = await prismaClient.post.findUnique({
    where: {
      id: parameters.postId,
    },
  });
  if (!post || post.userId != parameters.userId) {
    throw new Error("Unauthorized to delete this post");
  }
  await prismaClient.post.delete({
    where: {
      id: parameters.postId,
    },
  });
};



