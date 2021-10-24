
/*  
    登录
    密码加密
*/
export function encryption(pwd) {
    let arr = [];
    let md5 = require("js-md5")
    let password = md5(pwd);
    let date = Math.floor(new Date().getTime() / 1000000)
    let math = Math.floor(Math.random() * (10000 - 0 + 1)) + 0;
    if(math<=999){
      math=math+1000
    }
    arr.push(password, date.toString(), math.toString())
   let arre= arr.sort()
    let arr1=arr.join("");
    arr1=md5(arr1)
    return {arr1,math}
  }
  
  export function sort(a, b) {
    return a - b;
  }
  

  export function json(row){
    let arr=Object.keys(row)
    if(arr.length!=0){
      return row
    }
  }