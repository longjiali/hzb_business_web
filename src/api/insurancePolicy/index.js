import request from '@/utils/request'
import { data } from 'jquery'

/**
 * @name 查询雇主责任险列表
 * @param {object } param 
 * @returns 
 */
export function getEmployerPolicyList(param) {
  return request({
    url: '/employerPolicy/query',
    method: 'post',
    data: param
  })
}
/**
 * @name 保单车险保单列表
 * @param {*} params 
 * @returns 
 */
export function getCarPolicyQuery (params) {
  return request({
    url: '/carPolicy/query',
    method: 'post',
    data: params
  })
}

/**
 * @name 获取车险详情
 */
export function getCarPolicyDetail (params) {
  return request({
    url: `/carPolicy/detail/${params}`,
    method: 'get',
  })
}


/**
 * @name 查询雇主责任险详情
 */
export function getEmployerPolicyDetail (params) {
  return request({
    url: `/employerPolicy/detail/${params}`,
    method: 'get',
  })
}


/**
 * @name 车险报案
 * @param {*} params 
 * @returns 
 */
export function setCarClaimsLregist (params) {
  return request({
    url: '/carClaims/lregist',
    method: 'post',
    data: params
  })
}

/**
 * @name 非车报案
 * @param {} params 
 * @returns 
 */
export function setNonCarClaimsLregist (params) {
  return request({
    url: '/nonCarClaims/lregist',
    method: 'post',
    data: params
  })
}

/**
 * @name 车保导出
 * @param {*} params 
 * @returns 
 */
export function carPolicyExport (params) {
  return request({
    url: '/carPolicy/export',
    method: 'post',
    data: params
  })
}

/**
 * @name 车保导入
 * @param {*} params 
 * @returns 
 */
 export function carPolicyImport (params) {
  return request({
    url: '/carPolicy/import',
    method: 'post',
    data: params
  })
}

/**
 * @name 非车导出
 * @param {*} params 
 * @returns 
 */
export function employerPolicyExport (params) {
  return request({
    url: '/employerPolicy/export',
    method: 'post',
    data: params
  })
}


/**
 * @name 非车导入
 * @param {*} params 
 * @returns 
 */
export function employerPolicyImport (params) {
  return request({
    url: '/employerPolicy/import',
    method: 'post',
    data: params
  })
}