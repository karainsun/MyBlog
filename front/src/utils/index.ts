type AnyArr = any[]

type KeyProps = string | number | symbol
type ValProps = string | number | symbol | any

type NotAnyArr = Array<{ [key: KeyProps]: ValProps }>

/**
 * 文章按年份归档分组（可转化数组）
 * @param array // 被转换数组
 * @param key // 根据某个属性
 * @param attr // 根据传入的属性生成新属性
 * @param len // 截取长度
 * @returns
 */
export const archives = (array: AnyArr, key: string, attr: KeyProps, len: number) => {
  let attrArr: AnyArr = [],
    newArr = []
  array.forEach((e) => {
    let y = len === 0 ? e[key] : e[key].substring(0, len)
    if (!attrArr.includes(y)) {
      attrArr.push(y)
    }
  })
  for (let j = 0; j < attrArr.length; j++) {
    let posts = []
    for (let i = 0; i < array.length; i++) {
      let y = len === 0 ? array[i][key] : array[i][key].substring(0, len)
      if (attrArr[j] === y) {
        posts.push(array[i])
      }
    }
    newArr.push({
      [attr]: attrArr[j],
      posts: posts
    })
  }
  return newArr
}
/**
 * 数字月份转英文月份
 * @param date // 月份
 * @returns
 */
export const monthToEn = (date: string) => {
  const monthEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "October", "December"]
  return monthEnglish[new Date(new Date(date)).getMonth()]
}

/**
 * 按文章分类分组
 * @param array // 被转换数组
 * @returns
 */
 export const basisCate = (array: AnyArr) => {
  let attrArr: AnyArr = [],
    newArr = [];
  array.forEach((a) => {
    attrArr.push(a.category)
  })
  attrArr = seqArr(attrArr)
  for (let j = 0; j < attrArr.length; j++) {
    let posts = []
    for (let i = 0; i < array.length; i++) {
      let y = array[i].category
      if (y.name === attrArr[j].name) {
        posts.push(array[i])
      }
    }
    newArr.push({
      category: attrArr[j],
      posts: posts
    })
  }

  return newArr
}
/**
 * 数组去重
 * @param array
*/
export const seqArr = (arr: AnyArr) => {
  let obj: {[key: KeyProps]: ValProps} = {};
  arr = arr.reduce(function(a, b) {
    obj[b.name] ? '' : obj[b.name] = true && a.push(b);
    return a;
  }, [])
  return arr;
}

/**
 * 按文章标签分组
 * @param array // 被转换数组
 * @returns
 */
export const basisTag = (array: AnyArr) => {
  let attrArr: AnyArr = [],
    newArr = [];
  array.forEach((a) => {
    a.tags.forEach((b: any) => {
      attrArr.push(b)
    })
  })
  attrArr = seqArr(attrArr)
  for (let j = 0; j < attrArr.length; j++) {
    let posts = []
    for (let i = 0; i < array.length; i++) {
      let y = array[i].tags
      if (y.includes(attrArr[j])) {
        posts.push(array[i])
      }
    }
    newArr.push({
      tag: attrArr[j],
      posts: posts
    })
  }

  return newArr
}

/**
 * 格式化评论
 * @param comments
 * @returns
 */
export const formatList = (comments: AnyArr, parent: KeyProps, sun: KeyProps) => {
  const newList = comments.filter(e => {
    e.secondFloor = [];
    return Number(e[parent]) === Number(e[sun]);
  });
  const second = comments.filter(e => {
    return Number(e[parent])  !== Number(e[sun]);
  });
  for (let i = 0; i < newList.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (Number(second[j][parent])  == Number(newList[i].id)) {
        newList[i].secondFloor.push(second[j]);
      }
    }
  }
  return newList;
}
/**
 * 锚点定位滚动
 * @param id
 * @returns
 */
 export const goPoint = (id: string) => {
  ;(document.getElementById(id) as any).scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}
/**
 * 节点添加id
 * @param str
*/
export const formateHtml = (str: string) => {
  let box = document.getElementById('htmlBox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'htmlBox';
    box.style.display = 'none'
  }
  box.innerHTML = str
  const eles = box.children;
  for (let i = 0; i < eles.length; i++) {
    let tagName = (eles[i] as any).localName
    eles[i].id = tagName + i
  }

  return box.innerHTML
}
/**
 * 根据富文本生成目录
 * @param content
*/
export const navTree = (content: string) => {
  let titleHtml = ''
  let box = document.getElementById('detailBox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'detailBox';
    box.style.display = 'none'
  }
  box.innerHTML = content
  const eles = box.childNodes;
  for (let i = 0; i < eles.length; i++) {
    let tagName = (eles[i] as any).localName
    let title = ''
    const titleTxt = (eles[i] as any).innerText
    switch (tagName) {
      case 'h1':
        title = `<div class="nav-tit tit1 pointer" pointid="${(eles[i] as any).id}" title="${titleTxt}"># ${titleTxt}</div>`
        break;
      case 'h2':
        title = `<div class="nav-tit tit2 pointer fs-14" pointid="${(eles[i] as any).id}" title="${titleTxt}">${titleTxt}</div>`
        break;
      case 'h3':
        title = `<div class="nav-tit tit3 pointer fs-14" pointid="${(eles[i] as any).id}" title="${titleTxt}">${titleTxt}</div>`
        break;
      default:
        break;
    }
    titleHtml += title
  }

  return titleHtml
}
// 事件委托
export const getTagsClick = (id: string) => {
  const oDiv = document.getElementById(id);
  var aLi = (oDiv as any).getElementsByClassName('nav-tit');
  for (var i = 0; i < aLi.length; i++) {
    aLi[i].onclick = function (e: any) {
      goPoint(e.target.attributes.pointid.value)
    }
  }
}
/**
 * 切换主题
 * @param check
*/
export const checkTheme = (check: any) => {
  localStorage.setItem('theme', (check as any))
  document.getElementsByTagName("body")[0].style.setProperty("--backgroundColor", check ? "rgba(34, 38, 49)" : "#fff");
  document.documentElement.style.setProperty("--main-color", check ? "#e91e63" : "#0085a1");
  document.documentElement.style.setProperty('--gentle-wave', check ? "rgba(34, 38, 49)" : "#fff");
  document.documentElement.style.setProperty('--gentle-wave1', check ? "rgba(34, 38, 49, 0.7)" : "rgba(255, 255, 255, 0.7)");
  document.documentElement.style.setProperty('--gentle-wave2', check ? "rgba(34, 38, 49, 0.5)" : "rgba(255, 255, 255, 0.5)");
  document.documentElement.style.setProperty('--gentle-wave3', check ? "rgba(34, 38, 49, 0.3)" : "rgba(255, 255, 255, 0.3)");
  document.documentElement.style.setProperty('--h1-color', check ? "rgba(255, 255, 255, 0.8)" : "#333");
  document.documentElement.style.setProperty('--bd-shadow', check ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)");
  document.documentElement.style.setProperty('--mask-bg', check ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.7)");
  document.documentElement.style.setProperty('--img-light', (check ? .7 : 1) as any);
  document.documentElement.style.setProperty('--textarea-bg', check ? "#dbdbdb" : "#fff");
  document.documentElement.style.setProperty('--reply-bg', check ? "rgb(39, 44, 56)" : "#fafafa");
  document.documentElement.style.setProperty('--tag-bg1', check ? "rgb(150, 104, 239)" : "#d6d6d6");
  document.documentElement.style.setProperty('--tag-bg2', check ? "rgb(212, 103, 140)" : "#d6d6d6");
  document.documentElement.style.setProperty('--theme-switch', check ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)");
  document.documentElement.style.setProperty('--collect-border', check ? "#616161" : "#f3f3f3");
  document.documentElement.style.setProperty('--message-avatar-border', check ? "rgba(45, 52, 71)" : "rgba(0, 0, 0, .06)");
  document.documentElement.style.setProperty('--message-bg', check ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .05)");
  document.documentElement.style.setProperty('--message-clip', check ? "rgba(255, 255, 255, .25)" : "rgba(0, 0, 0, .25)");
  document.documentElement.style.setProperty('--message-box-bg', check ? "rgb(59, 66, 85)" : "rgba(255, 255, 255, 1)");
  document.documentElement.style.setProperty('--home-border', check ? "rgba(74, 74, 74, 1)" : "#e3e3e3");
  document.documentElement.style.setProperty('--tip-color', check ? "#f6f9fc" : "rgba(51, 51, 51, 0.9)");
  document.documentElement.style.setProperty('--insicon-color', check ? "#fff" : "#333");
  document.documentElement.style.setProperty('--top-color', check ? "#8f77fb" : "#f46267");
}

// 函数节流
export const throttle = (fn: any, delay: number) => {
  let canRun = true;
  return function () {
      if (!canRun) return;
      canRun = false;
      setTimeout(() => {
          fn();
          canRun = true;
      }, delay);
  };
}
// 函数防抖
export const debounce = (fn: Function, delay: number) => {
  let timer: any = null;
  return function(){
      if(timer !== null){
          clearTimeout(timer);
      }
      timer = setTimeout(fn,delay);
  }
}
// 数组转对象
export const arrToObj = (arr: AnyArr, key: any) => {
  const obj = arr.reduce((pre, item) => {
    return {...pre, [`${key}_${item[key]}`]: item}
  }, {})
  return obj
}
// 对象转 Map
export const objToMap = (obj: any) => {
  let map = new Map()
  for (let key in obj) {
    map.set(key, obj[key])
  }
  return map
}
/**
 * 随机数
 * @param min 最小
 * @param max 最大
*/
export const randNum = (min: number, max: number) => {
  const range = max - min;
  const rand = Math.random();
  const num = min + Math.round(rand * range);

  return num;
}
/**
 * Emoji
*/
export const emojiArr = () => {
  const emojiList = []

  for (let i = 1; i < 91; i++) {
    if(![41, 45, 54].includes(i)) {
      emojiList.push({
        img: `http://cdn.kayrain.cn/${i}.gif`,
        id: i
      })
    }
  }
  return emojiList
}
