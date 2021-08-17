const Category = require('../../models/category')
const { successResult } = require('../../utils/tools')
const _ = require('lodash')
const { Op } = require('sequelize')

// 查询全部
const categoryAll = async (ctx) => {
  const resData = await Category.findAll()
  ctx.body = successResult(resData)
}
// 条件查询
const categoryList = async (ctx) => {
  let { pageNo, pageSize, name, parent_name } = ctx.request.query
  name = (!name || _.isEmpty(name)) ? '' : name 
  parent_name = (!parent_name || _.isEmpty(parent_name)) ? '' : parent_name  
  const { count, rows } = await Category.findAndCountAll({
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [
        { name: { [Op.like]: `%${name}%` } },
        { parent_name: { [Op.like]: `%${parent_name}%` }
        }
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
// 创建
const categoryCreate = async (ctx) => {
  // ctx.body = ctx.request.body;
  let {
    name,
    parent_name
  } = ctx.request.body;
  parent_name = (!parent_name || _.isEmpty(parent_name)) ? '--' : parent_name
  const exc = await Category.findOne({
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
    await Category.create({
      name,
      parent_name
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
// 批量删除
const categoryDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await Category.destroy({
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
// 更新
const categoryUpdate = async (ctx) => {
  let { 
    name,
    parent_name,
    id
  } = ctx.request.body; 
  parent_name = (!parent_name || _.isEmpty(parent_name)) ? '--' : parent_name
  await Category.update({
    name: name,
    parent_name: parent_name
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

module.exports = {
  categoryAll,
  categoryList,
  categoryCreate,
  categoryDelete,
  categoryUpdate
}