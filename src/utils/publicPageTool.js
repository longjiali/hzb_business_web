import $store from '@/store'
/**
 * @name 车险新旧数据选择状态比对
 * @param { Array } original 原始数据 
 * @param { Array } newborn 新生数据
 */
export function contrastData (original, newborn) {
  return newborn.map((el, index) => {
    el.choose = original[index].choose
    el.types = el.types.map((el2, index2) => {
      el2.choose = original[index].types[index2].choose
      el2.items = el2.items.map((el3, index3) => {
        el3.choose = original[index].types[index2].items[index3].choose
        return el3
      })
      return el2
    })
    return el
  })
}

/**
 * @name 非车险新旧数据选择状态比对
 * @param { Array } original 原始数据
 * @param { Array } newborn  新数据
 */
export function nCarContrastData (original, newborn) {
  return newborn.map((el, index) => {
    el.choose = original[index].choose
    return el
  })
}
/**
 * @name 时间转换
 */
export function transformationDate (item) {
  if (!item) {
    return '无'
  }
  let dome = ''
  if (typeof item === 'string')
    item
    dome = new Date(parseInt(item))
  if (typeof item === 'object')
    dome = new Date(item)
  const data = dome.getDate() >= 10 ? dome.getDate() : `0${dome.getDate()}`
  const month = dome.getMonth() + 1 >= 10 ? dome.getMonth() + 1 : `0${dome.getMonth() + 1}`
  const year = dome.getFullYear()
  const hours = dome.getHours() >= 10 ? dome.getHours() : `0${dome.getHours()}`
  const minutes = dome.getMinutes() >= 10 ? dome.getMinutes() : `0${dome.getMinutes()}`
  const seconds = dome.getSeconds() >= 10 ? dome.getSeconds() : `0${dome.getSeconds()}`
  return `${year}-${month}-${data} ${hours} : ${minutes} : ${seconds}`
}

/**
 * @name 文件流转黄
 * @param {*} item 文件内容
 *  @param {*} type 类型
 */
export function upLoadFile (item, type) {
  const fileInfo = item.target.files
  if (type === 'images') {
    const params = []
    fileInfo.forEach(el => {
      params.push({ url: getBlobFileUrl(el), model: el })
    })
  } else if (type === 'text') {
    const form = new FormData()
    form.append("file", fileInfo[0])
    return form
  } else if (type === 'base64') {
    const reader = new FileReader()
    reader.readAsDataURL(fileInfo[0])
    reader.onload = function (e) {
      const base64Img = e.target.result
      console.log(base64Img)
    }
  }
}


/**
 * @name 日期格式转码
 * @param { number || object} item 转码数据
 * @param { string } type 转码数据类型 time: 时间戳 date: 日期
 * @returns 
 */
export function dateEncode (item, type) {
  if (!item) {
    return '无'
  }
  let dome = ''
  if (type === 'time') { // 时间戳格式
    dome = new Date(parseInt(item))
  } else if (type === 'date') { // 时间格式
    dome = new Date(item)
  }
  const data = dome.getDate() >= 10 ? dome.getDate() : `0${dome.getDate()}`
  const month = dome.getMonth() + 1 >= 10 ? dome.getMonth() + 1 : `0${dome.getMonth() + 1}`
  const year = dome.getFullYear()
  return `${year}-${month}-${data}`
}

/**
 * @name 日期格式转码（带时分秒）
 * @param { number || object} item 转码数据
 * @param { string } type 转码数据类型 time: 时间戳 date: 日期
 * @returns 
 */
 export function timeEncode (item, type) {
  if (!item) {
    return '无'
  }
  let dome = ''
  if (type === 'time') { // 时间戳格式
    dome = new Date(parseInt(item))
  } else if (type === 'date') { // 时间格式
    dome = new Date(item)
  }
  const data = dome.getDate() >= 10 ? dome.getDate() : `0${dome.getDate()}`
  const month = dome.getMonth() + 1 >= 10 ? dome.getMonth() + 1 : `0${dome.getMonth() + 1}`
  const year = dome.getFullYear()
  const hours = dome.getHours() >= 10 ? dome.getHours() : `0${dome.getHours()}`
  const minutes = dome.getMinutes() >= 10 ? dome.getMinutes() : `0${dome.getMinutes()}`
  const seconds = dome.getSeconds() >= 10 ? dome.getSeconds() : `0${dome.getSeconds()}`
  return `${year}-${month}-${data} ${hours} : ${minutes} : ${seconds}`
}


/**
 * @ name 金额转大写
 * @param { number } money 金额
 * @returns
 */
export function moneyEncode (money) {
  if (!money) {
    return '无'
  }
  let cnNums = new Array( "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖")
  let cnIntRadice = new Array("", "拾", "佰", "仟")
  let cnIntUnits = new Array("", "万", "亿", "兆")
  let cnDecUnits = new Array("角", "分", "毫", "厘")
  let cnInteger = "整"
  let cnIntLast = "元"
  let maxNum = 999999999999999.9999
  let integerNum
  let decimalNum
  let chineseStr = ""
  let parts
  if (money == "") {
    return ""
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    return ""
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  money = money.toString()
  if (money.indexOf(".") == -1) {
    integerNum = money
    decimalNum = ""
  } else {
    parts = money.split(".")
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    let IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n == "0") {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  if (decimalNum != "") {
    let decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1)
      if (n != "0") {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == "") {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == "") {
    chineseStr += cnInteger
  }
  return `${chineseStr}(￥${money}元)`
}

/**
 * @name 地址转换
 * @param {*} params 源数据
 * @param {*} item 字段信息
 */
export function addressEnCode (params, item) {
  return `${params[item.model1] ? params[item.model1] : ''}${params[item.model2] ? params[item.model2] : ''}${params[item.model3] ? params[item.model3] : ''} ${params[item.model] ? params[item.model] : ''}`
}

export function publicEnCode (item, type) {
  if (!item || !item < 0) {
    return '无'
  }
  if (type === 'certificates') {
    const dome = $store.getters.codeList.find(el => el.id * 1 === item * 1)
    return dome ? dome.dictLabel : '无'
  } else if (type === 'isvideosurveyFlag') {
    return item * 1 === 1 ? '视频' : '非视频'
  } else if (type === 'insuredCarFlag') {
    return item * 1 === 0 ? '三者' : '标的'
  } else if (type === 'sex') {
    return item * 1 === 1 ? '男' : '女'
  } else if (type === 'bigcaseFlag') {
    return item * 1 === 1 ? '是' : '否'
  } else if (type === 'firstSiteFlag') {
    return item * 1 === 1 ? '第一现场' : item * 1 === 2 ? '第二现场' : '第三现场'
  } else if (type === 'claimType') {
    return item * 1 === 0 ? '有责涉及死亡的赔案' : item * 1 === 1 ? '有责不涉及死亡的赔案' : item * 1 === 2 ? '无责赔案' : item * 1 === 3 ? '垫付赔款' : item * 1 === 4 ? '垫付救助基金' : '其他'
  } else {
    return '无'
  }
}

/**
 * @name 转图片链接
 */
 function getBlobFileUrl (item) {
  const win = window
  if (win.createObjectURL !== undefined) {
    return win.createObjectURL(item)
  } else if (win.URL !== undefined) {
    return win.URL.createObjectURL(item)
  } else if (win.webkitURL !== undefined) {
    return win.webkitURL.createObjectURL(item)
  }
}