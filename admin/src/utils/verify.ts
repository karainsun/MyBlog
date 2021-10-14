export type VerifyFn = (rule: Array<{[key: string]: string}>, value: string, callback: (f?: object) => void) => void

// 验证名称长度
export const checkLength: VerifyFn = (_rule, value, callback) => { 
  if (value.length > 16) { 
    return Promise.reject("不可超过十六位字符！"); 
  }
  return Promise.resolve();
}
// 验证邮箱（QQ和163）
export const checkEmail = (_rule: any, value: any, callback: any) => { 
  // const reg = new RegExp("^\w[-\w.+]*@(qq|163)\.+com");
  const reg = /^\w[-\w.+]*@(qq|163)\.+com$/;
  if (!reg.test(value)) {  
    return Promise.reject("请输入正确的QQ或163邮箱！"); 
  }
  return Promise.resolve();
}