import request from './request'

interface GetAllBlogsProps {
  pageSize: number
  pageNum: number
}

export const getAllBlogs = ({ pageSize, pageNum }: GetAllBlogsProps) => {
  return request({
    url: '/article',
    method: 'get',
    params: {
      pageSize,
      pageNum,
    },
  })
}
