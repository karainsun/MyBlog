type arrType = Array<any>;

/**
 * reduce 路由数组扁平化
 * @param {object[]} arr 数组
 * @param {string} key 键名
 */

export const routerFlatten = (arr: arrType, key: string): arrType => {
  const newArr = arr.map((f) =>
    Object.assign({}, { path: f.path, name: f.name })
  );
  return arr.reduce((res, item) => {
    const resCon = res.concat(
      Array.isArray(item[key]) ? routerFlatten(item[key], key) : item
    );
    return resCon.concat(newArr);
  }, []);
};

/**
 * reduce 数组扁平化
 * @param {object[]} arr 数组
 */
export const flatten = (arr: arrType): arrType => {
  return arr.reduce((res, item) => {
    return res.concat(
      Array.isArray(item.children) ? flatten(item.children) : item
    );
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
// 获取当前地理坐标  121.445   31.213
export const getLocation = (): any => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position.coords);
        },
        function (e) {
          // throw new Error('faild')
          reject(e);
          // return e
          // throw e
        },
        { enableHighAccuracy: true }
      );
    });
  }
};

export const setHeight = (h: number): number => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return (clientHeight - h);
};
