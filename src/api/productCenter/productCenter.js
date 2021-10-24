import request from '@/utils/request'


// 查询产品列表
export function queryProductList(data) {
  return request({
    url: '/product/query',
    method: 'post',
    data
  })
}