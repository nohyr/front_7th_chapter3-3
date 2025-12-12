import { apiClient } from '@/shared/api/client'
import { Post, PostsResponse, Tag, CreatePostDto, UpdatePostDto } from '../model/types'
import { UsersResponse } from '@/entities/user/model/types'

export const postApi = {
  getPosts: async (params: { limit: number; skip: number }) => {
    const postsResponse = await apiClient.get<PostsResponse>('/posts', { params })
    const usersResponse = await apiClient.get<UsersResponse>('/users', {
      params: { limit: 0, select: 'username,image' },
    })

    const postsWithAuthors = postsResponse.data.posts.map((post) => ({
      ...post,
      author: usersResponse.data.users.find((user) => user.id === post.userId),
    }))

    return {
      ...postsResponse.data,
      posts: postsWithAuthors,
    }
  },

  searchPosts: async (query: string) => {
    const response = await apiClient.get<PostsResponse>(`/posts/search`, { params: { q: query } })
    return response.data
  },

  getPostsByTag: async (tag: string) => {
    const [postsResponse, usersResponse] = await Promise.all([
      apiClient.get<PostsResponse>(`/posts/tag/${tag}`),
      apiClient.get<UsersResponse>('/users', { params: { limit: 0, select: 'username,image' } }),
    ])

    const postsWithAuthors = postsResponse.data.posts.map((post) => ({
      ...post,
      author: usersResponse.data.users.find((user) => user.id === post.userId),
    }))

    return {
      ...postsResponse.data,
      posts: postsWithAuthors,
    }
  },

  getTags: async () => {
    const response = await apiClient.get<Tag[]>('/posts/tags')
    return response.data
  },

  createPost: async (dto: CreatePostDto) => {
    const response = await apiClient.post<Post>('/posts/add', dto)
    return response.data
  },

  updatePost: async (dto: UpdatePostDto) => {
    const { id, ...data } = dto
    const response = await apiClient.put<Post>(`/posts/${id}`, data)
    return response.data
  },

  deletePost: async (id: number) => {
    const response = await apiClient.delete(`/posts/${id}`)
    return response.data
  },
}
