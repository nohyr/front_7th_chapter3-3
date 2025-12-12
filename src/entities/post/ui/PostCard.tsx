import { Post } from '../model/types'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { highlightText } from '@/shared/lib/highlight'

interface PostCardProps {
  post: Post
  searchQuery?: string
  onTagClick?: (tag: string) => void
  onAuthorClick?: () => void
}

export const PostCard = ({ post, searchQuery = '', onTagClick, onAuthorClick }: PostCardProps) => {
  return (
    <>
      <div className="space-y-1">
        <div>{highlightText(post.title, searchQuery)}</div>
        <div className="flex flex-wrap gap-1">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer text-blue-800 bg-blue-100 hover:bg-blue-200"
              onClick={() => onTagClick?.(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onAuthorClick}>
        <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
        <span>{post.author?.username}</span>
      </div>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{post.reactions?.likes || 0}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{post.reactions?.dislikes || 0}</span>
      </div>
    </>
  )
}
