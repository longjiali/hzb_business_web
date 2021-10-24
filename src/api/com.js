import request from '@/utils/request'
// params/get   data/post


// 首页-查询待跟进客户
export function overdueFollowFollow(data) {
  return request({
    url: '/index/overdue/follow/follow',
    method: 'get',
  })
}

// 首页-查询超期未联系客户
export function overdueFollowList(data) {
  return request({
    url: '/index/overdue/follow/list',
    method: 'get',
    params:data,
  })
}


//首页-查询待跟进客户
export function unfinishFollowCount(data) {
  return request({
    url: '/index/unfinish/follow/count',
    method: 'get',
  })
}
//首页-查询超期未联系客户
export function unfinishFollowList(data) {
  return request({
    url: '/index/unfinish/follow/list',
    method: 'get',
    params:data,
  })
}


// 我的提出问题列表
export function ideaMyIdeas(data) {
  return request({
    url: '/busi/follow/idea/myIdeas',
    method: 'get',
    params:data,
  })
}
// 我的未回复问题
export function myUnfinishs(data) {
  return request({
    url: '/busi/follow/idea/my/unfinishs',
    method: 'get',
    params:data,
  })
}
// 查询跟进-登录人超时跟进信息
export function followOvertimesCount(data) {
  return request({
    url: '/busi/customer/follow/overtimes/count?custType='+data,
    method: 'get',
  })
}

// 查询跟进-登录人超时跟进信息
export function followovertimesInfo(data) {
  return request({
    url: '/busi/customer/follow/overtimes',
    method: 'get',
    params:data
  })
}
// 查询跟进-登录人待跟进信息
export function followUnfinished(data) {
  return request({
    url: '/busi/customer/follow/unfinished',
    method: 'get',
    params:data
  })
}

// 查询跟进-登录人待跟进客户数量
export function followUnfinishedCount(data) {
  return request({
    url: '/busi/customer/follow/unfinished/count?custType='+data,
    method: 'get',
  })
}

// 获取地域
export function getAreas(query) {
  return request({
    url: '/areas/accessToTerritory',
    method: 'post',
    params:query
  })
}

// 获取品牌
export function queryBrand() {
  return request({
    url: '/common/queryBrand',
    method: 'get'
  })
}
