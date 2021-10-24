import request from '@/utils/request'

export const queryProduct= (data) =>{
  return request({
    url: '/product/query',
    method: 'post',
    data: data
  })
}

export const saveProduct= (data) =>{ // 新增产品配置信息
  return request({
    url: '/product/save',
    method: 'post',
    data: data
  })
}

export const productDet= (productId) =>{ // 产品配置信息详情
  return request({
    url: '/product/detail/'+ productId,
    method: 'get',
  })
}

export const editProduct= (data) =>{ // 编辑产品配置信息
  return request({
    url: '/product/update',
    method: 'post',
    data: data
  })
}

export const queryScheme= (data) =>{ // 方案配置列表
  return request({
    url: '/programme/query',
    method: 'post',
    data: data
  })
}

export const saveScheme= (data) =>{ // 新增方案配置信息
  return request({
    url: '/programme/insert',
    method: 'post',
    data: data
  })
}

export const programmeDet= (programmeId) =>{ // 产品方案配置详情
  return request({
    url: '/programme/detail/'+ programmeId,
    method: 'get',
  })
}