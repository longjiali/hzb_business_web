import request from '@/utils/request'


// 查询企业客户信息详情
export function companyCustomerGet(data) {
  return request({
    url: '/cust/company/customer/get/'+data,
    method: 'get',
  })
}

// 编辑个人客户信息数据
export function addOrEditPersonal(data) {
  return request({
    url: '/cust/personal/customer/edit',
    method: 'post',
    data:data
  })
}

// 查询企业客户信息列表
export function customerList(data) {
  return request({
    url: '/cust/company/customer/list',
    method: 'get',
    params:data
  })
}

// 编辑企业客户信息数据
export function customerEdit(data) {
  return request({
    url: '/cust/company/customer/edit',
    method: 'get',
    data:data
  })
}


// 编辑客户标签类型表数据
export function lableTypeEdit(data) {
  return request({
    url: '/cust/lable/type/edit',
    method: 'post',
    data:data
  })
}
// 编辑客户标签表数据
export function lablEdit() {
  return request({
    url: '/cust/lable/edit',
    method: 'post',

  })
}

// 查询客户标签类型表列表
export function typeList() {
  return request({
    url: '/cust/lable/type/page',
    method: 'get',

  })
}

// 查询客户标签表列表
export function lableList() {
  return request({
    url: '/cust/lable/list',
    method: 'get',
  })
}

// 学生账号列表
export function studentPageList(data) {
    return request({
        url: '/student/pageList',
        method: 'get',
        params: data
    })
}
  // 新增學生賬號
export function studentInsert(data) {
  return request({
    url: '/student/insert',
    method: 'post',
    data: data
  })
}
// 刪除學生賬號根據id,可批量刪除
export function studentDelete(data) {
  return request({
    url: '/student/delete?',
    method: 'post',
    data: data
  })
}
// 重置密碼與修改密碼
export function studentUpdate(data) {
  return request({
    url: '/student/update',
    method: 'post',
    params:data
  })
}
// 修改密碼
export function studentUpdatePassword(data) {
  return request({
    url: '/student/update-password',
    method: 'post',
    params:data
  })
}

// 导入学生信息
export function batchImportStudent(data) {
  return request({
    url: '/student/batchImportStudent',
    method: 'post',
    data: data
  })
}

// 調班
export function studentChangeShift(data) {
  return request({
    url: '/student/change-shift',
    method: 'post',
    data:data
  })
}

//  根据字典英文名称查询字典数据信息
export function dataEnName(data) {
  return request({
    url: '/system/dict/data/enName',
    method: 'get',
    params:data
  })
}

// 修改密碼
export function updatePassword(data) {
  return request({
    url: '/student/update-password',
    method: 'post',
    params:data
  })
}

// 新增共享目录
export function addTmpClbumDir(data) {
  return request({
    url: '/student/add-tmp-clbum-dir',
    method: 'post',
    params:data
  })
}

//  查询客户标签表列表-type
export function getUserTagList(data) {
    return request({
      url: '/cust/lable/type/list',
      method: 'get',
      params:data
    })
}

//  删除客户标签-type
export function deleUserTagList(id) {
    return request({
      url: '/cust/lable/type/delete/'+id,
      method: 'post',
    })
}

//  新增客户标签-type
export function addEditUserTag(data) {
    return request({
      url: '/cust/lable/type/edit',
      method: 'post',
      data: data
    })
}

// 获取详情-type
export function getUserTagDel(id) {
    return request({
      url: '/cust/lable/type/get/'+id,
      method: 'get',
    })
}

// 获取用户标签列表
export function getUserLabelList(data){
    return request({
        url: '/cust/lable/page',
        method: 'get',
        params: data
    })
}

//  新增/编辑客户标签
export function setUserLabel(data) {
    return request({
      url: '/cust/lable/edit',
      method: 'post',
      data:data
    })
}

//  删除客户标签
export function delUserLabel(id) {
  return request({
    url: '/cust/lable/delete/'+ id,
    method: 'post'
  })
}


//  客户跟进标签属性表列表
export function getFollowLabelList() {
  return request({
    url: '/cust/follow/lable/list',
    method: 'get'
  })
}

//  删除客户跟进标签属性表
export function delFollowLabel(id) {
  return request({
    url: '/cust/follow/lable/delete/'+id,
    method: 'post'
  })
}

//  新增/删除客户跟进标签属性表
export function addOrEditFollowLabel(data) {
  return request({
    url: '/cust/follow/lable/edit',
    method: 'post',
    data: data
  })
}

//  客户跟进标签属性表列表
export function getFollowTableListAttr(data) {
  return request({
    url: '/cust/follow/lable/attr/list',
    method: 'get',
    params: data
  })
}

//  删除客户跟进标签属性表
export function delFollowTableAttr(id) {
  return request({
    url: '/cust/follow/lable/attr/delete/'+id,
    method: 'post'
  })
}

//  新增/编辑客户跟进标签属性表
export function addOrEditFollowTableAttr(data) {
  return request({
    url: '/cust/follow/lable/attr/edit',
    method: 'post',
    data: data
  })
}

//  批量删除客户跟进标签属性表
export function delFollowAllTableAttr(data) {
  return request({
    url: '/cust/follow/lable/attr/batch/delete',
    method: 'post',
    data: data
  })
}

//  客户提醒策略列表
export function getReminderStrategyList(data) {
  return request({
    url: '/cust/follow/lable/warn/page',
    method: 'get',
    params: data
  })
}

//  编辑/新增客户提醒策略列表
export function editOrAddReminderStrategyList(data) {
    return request({
      url: '/cust/follow/lable/warn/edit',
      method: 'post',
      data: data
    })
  }

//  删除客户提醒策略列表
export function detReminderStrategyList(id) {
  return request({
    url:  `/cust/follow/lable/warn/delete/${id}`,
    method: 'post'
  })
}

// 查询员工
export function queryUserSelector(){
  return request({
    url:'user/queryUserSelector',
    method:'get'
  })
}

// 编辑客户流转-所属人信息数据
export function ownerEdit(data){
  return request({
    url:'/cust/customer/owner/edit',
    method:'post',
    data:data
  })
}


export function ownerPage(data) {
  return request({
    url: '/cust/customer/owner/list',
    method: 'get',
    params: data
  })
}
// 查询个人客户信息列表
export function personalCustomerList(data) {
  return request({
    url: '/cust/company/customer/linkman/list',
    method: 'get',
  })
}
