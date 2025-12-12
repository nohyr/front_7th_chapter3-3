import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi } from './postApi'
import { CreatePostDto, UpdatePostDto } from '../model/types'
import { showErrorToast } from '@/shared/lib/errorHandler'

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params: { limit: number; skip: number }) => [...postKeys.lists(), params] as const,
  search: (query: string) => [...postKeys.all, 'search', query] as const,
  byTag: (tag: string) => [...postKeys.all, 'tag', tag] as const,
  tags: () => [...postKeys.all, 'tags'] as const,
}

export const usePosts = (params: { limit: number; skip: number }) => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postApi.getPosts(params),
    throwOnError: (error) => {
      showErrorToast(error)
      return false
    },
  })
}

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: postKeys.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: !!query,
  })
}

export const usePostsByTag = (tag: string) => {
  return useQuery({
    queryKey: postKeys.byTag(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: !!tag && tag !== 'all',
  })
}

export const useTags = () => {
  return useQuery({
    queryKey: postKeys.tags(),
    queryFn: postApi.getTags,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreatePostDto) => postApi.createPost(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
    onError: (error) => {
      showErrorToast(error)
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: UpdatePostDto) => postApi.updatePost(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
    onError: (error) => {
      showErrorToast(error)
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
    onError: (error) => {
      showErrorToast(error)
    },
  })
}
