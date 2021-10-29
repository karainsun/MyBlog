const {
  tag: Tag, 
} = require('../../models')
const { successResult } = require('../../utils/tools')
const _ = require('lodash')
const { Op } = require('sequelize')
const sequelize = require('../../utils/sequelize')

// 查询全部
const tagAll = async (ctx) => {
  const resData = await Tag.findAll({
    attributes: ['name', 'id', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
    group: 'name',
    where: {
      articleId: { [Op.not]: null }
    },
    order: [[sequelize.fn('COUNT', sequelize.col('name')), 'desc']]
  })
  ctx.body = successResult(resData)
}
// 条件查询
const tagList = async (ctx) => { 
  let {
    pageNo,
    pageSize,
    name 
  } = ctx.request.query
  if (!name || _.isEmpty(name)) {
    name = ''
  } 
  const {
    count,
    rows
  } = await Tag.findAndCountAll({
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [{
          name: {
            [Op.like]: `%${name}%`
          }
        } 
      ]
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
// 创建
const tagCreate = async (ctx) => {
  // ctx.body = ctx.request.body;
  const {
    name 
  } = ctx.request.body;
  const exc = await Tag.findOne({
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
    await Tag.create({
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
// 批量删除
const tagDelete = async (ctx) => {
  const {
    ids
  } = ctx.request.body;
  await Tag.destroy({
    where: {
      id: {
        [Op.or]: ids
      }
    }
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
const tagUpdate = async (ctx) => {
  const { 
    name,
    id
  } = ctx.request.body; 

  await Tag.update({
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

module.exports = {
  tagAll,
  tagList,
  tagCreate,
  tagDelete,
  tagUpdate
}