import request from '@/utils/request'


/**
 * @name 查询车险理赔列表
 */
export function getCarClaimsQuery (params) {
  return request({
    url: `/carClaims/query`,
    method: 'post',
    data: params
  })
}

/**
 * @name 查询车险理赔详情
 */
export function getCarClaimsDetail (params) {
  return request({
    url: `/carClaims/detail/${params}`,
    method: 'get'
  })
}

/**
 * @name 查询跟踪信息
 */
export function getCarClaimsFollowQuery (params) {
  return request({
    url: `/carClaims/follow/query/${params}`,
    method: 'post'
  })
}

/**
 * @name 保存跟踪信息
 * @param {*} params 
 * @returns 
 */
export function getCarClaimsFollowCommit (params) {
  return request({
    url: `/carClaims/follow/commit`,
    method: 'post',
    data: params
  })
}


/**
 * @name 查询车险资料收集
 * @param {*} params 
 * @returns 
 */
export function getMaterialDetail (params, type) {
  return request({
    url: `/odscar/material/detail/${params}/${type ? type : 0}`,
    method: 'get'
  })
}

/**
 * @name 保存车险资料收集
 * @param {*} params 
 * @returns 
 */
export function setMaterialSave (params) {
  return request({
    url: `/odscar/material/save`,
    method: 'post',
    data: params
  })
}

/**
 * @name 查询雇主责任险理赔列表
 * @returns 
 */
export function getNonCarClaimsQuery (params) {
  return request({
    url: '/nonCarClaims/query',
    method: 'post',
    data: params
  })
}

/**
 * @name 查询雇主责任险理赔详情
 * @param {*} params 
 * @returns 
 */
export function getNonCarClaimsdetail (params) {
  return request({
    url: `/nonCarClaims/detail/${params}`,
    method: 'get'
  })
}

/**
 * @name 查询理赔资料收集信息
 * @param {*} params 
 * @returns 
 */
export function getOdsMaterialDetail (params) {
  return request({
    url: `/ods/material/detail/${params}/0`,
    method: 'post'
  })
}

/**
 * @name 保存理理赔资料收集
 * @param {*} params 
 * @returns 
 */
export function setOdsMaterialSave (params) {
  return request({
    url: '/ods/material/save',
    method: 'post',
    data: params
  })
}

/**
 * @name 查询流程跟踪信息
 * @param {*} params 
 * @returns 
 */
export function getNonCarClaimsFollowQuery (params) {
  return request({
    url: `/nonCarClaims/follow/query/${params}`,
    method: 'post'
  })
}

/**
 * @name 设置流程跟踪信息
 * @param {*} params 
 * @returns 
 */
export function setNonCarClaimsFollowCommit (params) {
  return request({
    url: '/nonCarClaims/follow/commit',
    method: 'post',
    data: params
  })
}


/**
 * @name  文件上传
 * @param {*} params 
 * @returns 
 */
export function setFileUpload (params) {
  return request({
    url: '/file/upload',
    method: 'post',
    data: params
  })
}

export function setShortUrl (params) {
  return request({
    url: '/file/shortUrl',
    method: 'post',
    data: params
  })
}