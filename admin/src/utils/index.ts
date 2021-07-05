type arrType = Array<any>;

/**
 * reduce 数组扁平化
 * @param {object[]} arr 数组
 * @param {string} key 键名
 */

export const flatten = (arr: arrType, key: string): arrType => {
  const newArr = arr.map((f) =>
    Object.assign({}, { path: f.path, name: f.name })
  );
  return arr.reduce((res, item) => {
    const resCon = res.concat(
      Array.isArray(item[key]) ? flatten(item[key], key) : item
    );
    return resCon.concat(newArr);
  }, []);
};

/**
 * 数组转对象
 * @param {string[]} arr 数组
 * @param {string} path 键名
 * @param {string} name 键名
 */
// export const arrToObj = (arr: string[], key: string, val: string) => {
//   return arr.reduce((res, item) => {
//     return {...res, [item[key]]: item[val]}
//   }, {});
// }

export const arrToObj = (arr: Array<{ path?: string; name?: string }>) => {
  return arr.reduce((prev, current) => {
    if (current.path) {
      prev[current.path] = current.name;
    }
    return prev;
  }, {} as { [key: string]: string | undefined });
};
