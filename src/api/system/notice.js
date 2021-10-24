import request from '@/utils/request'


// 查询公告详情
export function noticeGet(id) {
  return request({
    url: '/notice/get/'+id,
    method: 'get',
  })
}

// 编辑公告数据
export function noticeEdit(data) {
  return request({
    url: '/notice/edit',
    method: 'post',
    data: data
  })
}
// 查询公告列表
export function noticePage(data) {
  return request({
    url: '/notice/page',
    method: 'post',
    data: data
  })
}

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/system/notice/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/system/notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId) {
  return request({
    url: '/notice/delete/' + noticeId,
    method: 'post'
  })
}
// 批量删除公告数据
export function noticeBatchDelete(data) {
  return request({
    url: '/notice/batch/delete',
    method: 'post',
    data:data
  })
}
// 首页查询
export function noticeList() {
  return request({
    url: '/notice/list',
    method: 'get',
  })
}


