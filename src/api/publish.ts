import request from '@/api/request'

export interface PublishBlogProps {
  title: string
  content: string
  categories: string[]
  desc: string
}

// 发布文章
export function publishBlog(
  params: PublishBlogProps,
): Promise<{ code: number; message: string }> {
  return request({
    url: '/article/add',
    method: 'post',
    data: params,
  })
}
