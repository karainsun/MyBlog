const { collect_category: CollectCategory, collect: Collect } = require('../../models') 
const _ = require('lodash')
const { Op } = require('sequelize')
const sequelize = require('../../utils/sequelize')
const { successResult } = require('../../utils/tools')

// 创建收藏分类
const collectCategoryCreate = async (ctx) => {  
  let { name } = ctx.request.body; 
  const exc = await CollectCategory.findOne({
    where: {
      name: name
    }
  })
  if (exc) {
    ctx.body = {
      code: 200,
      msg: '已存在此分类',
      status: 'field'
    }
  } else {
    await CollectCategory.create({
      name 
    }).then(res => {
      return ctx.body = {
        code: 200,
        msg: '创建成功',
        status: 'success'
      }
    }).catch(error => {
      console.log('创建失败：', error.message);
      return ctx.body = {
        code: 501,
        msg: error.message,
        status: 'field'
      }
    })
  }
}
// 查询全部分类
const collectCategoryAll = async (ctx) => {
  const resData = await CollectCategory.findAll({ 
    order: ['createdAt'],
    attributes: ['id', 'name', 'createdAt']
  })
  ctx.body = successResult(resData)
}
// 分类条件查询
const collectCategoryList = async (ctx) => {
  let { pageNo, pageSize, name } = ctx.request.query
  name = (!name || _.isEmpty(name)) ? '' : name 
  const { count, rows } = await CollectCategory.findAndCountAll({
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [
        { name: { [Op.like]: `%${name}%` } }
      ]
    }
  })
  resData = {
    list: rows,
    meta: {
      count: count,
      total_pages: Math.ceil(count / pageSize),
    }
  }
  ctx.body = successResult(resData)
}
// 更新分类
const collectCategoryUpdate = async (ctx) => {
  let { name, id } = ctx.request.body;  
  await CollectCategory.update({
    name: name 
  }, {
    where: {
      id: id
    }
  }).then(res => {  
    const returnValue = {
      code: 200,
      msg: '更新成功',
      status: 'success'
    }
    if (res === 0 ) {
      returnValue.msg = '更新失败'
      returnValue.status = 'field'
    }
    return ctx.body = returnValue
  }).catch(error => {
    console.log('更新失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  })
}
// 批量删除分类
const collectCategoryDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await CollectCategory.destroy({
    where: { id: { [Op.or]: ids } }
  }).then(res => {
    const returnValue = {
      code: 200,
      msg: '删除成功',
      status: 'success'
    }
    if (res === 0) {
      returnValue.msg = '不存在删除项'
      returnValue.status = 'field'
    }
    return ctx.body = returnValue
  }).catch(error => {
    console.log('删除失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  })
}

// 新建收藏
const collectCreate = async (ctx) => {  
  const requestBody = ctx.request.body; 
  const exc = await Collect.findOne({
    where: {
      name: requestBody.name
    }
  })
  if (exc) {
    ctx.body = {
      code: 200,
      msg: '已存在此条目',
      status: 'field'
    }
  } else { 
    await Collect.create(requestBody).then(res => {
      return ctx.body = {
        code: 200,
        msg: '创建成功',
        status: 'success'
      }
    }).catch(error => {
      console.log('创建失败：', error.message);
      return ctx.body = {
        code: 501,
        msg: error.message,
        status: 'field'
      }
    })
  }
}
// 收藏列表
const collectList = async (ctx) => {
  let {
    pageNo,
    pageSize,
    name,
    category
  } = ctx.request.query
  name = (!name || _.isEmpty(name)) ? '' : name
  category = (!category || _.isEmpty(category)) ? '' : category 
  const {
    count,
    rows
  } = await Collect.findAndCountAll({
    order: [
      ['createdAt']
    ],
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [{
        name: {
          [Op.like]: `%${name}%`
        },
        category: {
          [Op.like]: `%${category}%`
        }
      }]
    } 
  })
  const resData = {
    list: rows,
    meta: {
      count: count,
      total_pages: Math.ceil(count / pageSize),
    }
  }
  ctx.body = successResult(resData)
}
// 批量删除收藏
const collectDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await Collect.destroy({
    where: { id: { [Op.or]: ids } }
  }).then(res => {
    const returnValue = {
      code: 200,
      msg: '删除成功',
      status: 'success'
    }
    if (res === 0) {
      returnValue.msg = '不存在删除项'
      returnValue.status = 'field'
    }
    return ctx.body = returnValue
  }).catch(error => {
    console.log('删除失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  })
}
// 更新收藏
const collectUpdate = async (ctx) => {
  const requestBody = ctx.request.body; 
  console.log('收藏参数：', requestBody);
  const collectId = parseInt(requestBody.id) 
  await Collect.update(requestBody, {
    where: {
      id: collectId
    }
  }).then(res => {  
    const returnValue = {
      code: 200,
      msg: '更新成功',
      status: 'success'
    }
    if (res === 0 ) {
      returnValue.msg = '更新失败'
      returnValue.status = 'field'
    }
    return ctx.body = returnValue
  }).catch(error => {
    console.log('更新失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  })
}

module.exports = {
  collectCategoryCreate,
  collectCategoryList,
  collectCategoryUpdate,
  collectCategoryDelete,
  collectCategoryAll,
  collectCreate,
  collectList,
  collectDelete,
  collectUpdate
}