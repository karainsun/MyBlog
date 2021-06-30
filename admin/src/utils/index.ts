type arrType = Array<any>

/**
 * reduce 数组扁平化
 * @param {object[]} arr 数组
 * @param {string} key 键名
 */

export const flatten = (arr: arrType, key: string): arrType => { 
  return arr.reduce((res, item) => {
    return res.concat(Array.isArray(item[key]) ? flatten(item[key], key) : item)
  }, [])
}