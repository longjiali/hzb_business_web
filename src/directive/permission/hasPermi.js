 /**
 * 操作权限处理
 * 
 */
 
import store from '@/store'

export default {
  // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted(el, binding, vnode) {
    const { value } = binding
    const all_permission = "*:*:*";
    const permissions = store.getters && store.getters.permissions
    // 用于识别正在处理的对象的类型。与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some(permission => {
        // includes() 方法用于判断字符串是否包含指定的子字符串。
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        /* 
          parentElement   获取对象层次中的父对象。
          parentNode      获取文档层次中的父对象。
          childNodes      获取作为指定对象直接后代的 HTML 元素和 TextNode 对象的集合。
          children        获取作为对象直接后代的 DHTML 对象的集合。
         */
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
