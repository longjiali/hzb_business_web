import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/user/getRouters',
    method: 'get'
  })
}

/**
 * @name 查询证件类型信息
 * @returns 
 */
export function codeListData () {
  return request({
    url: '/system/dict/data/list',
    method: 'post',
    data: {
      pageNum:1,
      pageSize:9999,
      enName:"company_certificate"
    }
  })
}
