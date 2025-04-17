import request from './request'

interface GetAllBlogsProps {
  pageSize: number
  pageNum: number
}

interface Category {
  id: number
  created_at: Date
  updated_at: Date
  name: string
}

interface Blog {
  id: number
  created_at: Date
  updated_at: Date
  title: string
  content: string
  desc: string
  view_count: number
  like_count: number
  comment_count: number
  categories: Array<Category>
}

export interface GetAllBlogsResponse {
  code: number
  data: Array<Blog>
  message: string
  total?: number
}

export const getAllBlogs = ({
  pageSize,
  pageNum,
}: GetAllBlogsProps): Promise<GetAllBlogsResponse> => {
  return request({
    url: '/article',
    method: 'get',
    params: {
      pageSize,
      pageNum,
    },
  })
}
