const fs = require('fs')

/**
 * 通过文件夹名称来动态导入文件
 * @param dirName 文件夹名称
 */
const importByDir = (dirName) => {
  // 获取目录文件夹
  const fileRes = fs.readdirSync(dirName);
  // 读取文件夹，然后动态导入
  fileRes.forEach(p => {
    import(dirName + '/' + p)
  });
}


/**
 * 成功数据返回
 * @param data 
 * @returns 
 */
 const successResult = (data, code = 200) => {
  return {
    code,
    data
  }
}  

module.exports = {
  importByDir,
  successResult
}