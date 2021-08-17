const Article = require('../../models/article')
const { successResult } = require('../../utils/tools')
const _ = require('lodash')
const { Op } = require('sequelize')

// 创建文章
const articleCreate = async (ctx) => { 
  const requestBody = ctx.request.body;
  const exc = await Article.findOne({
    where: {
      title: requestBody.title
    }
  })
  if (exc) {
    ctx.body = {
      code: 200,
      msg: '已存在此分类',
      status: 'field'
    }
  } else {
    await Article.create(requestBody).then(res => {
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
// 文章列表
const articleList = async (ctx) => {
  let { pageNo, pageSize, title } = ctx.request.query
  title = (!title || _.isEmpty(title)) ? '' : title 
  const { count, rows } = await Article.findAndCountAll({
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [{
        title: {
          [Op.like]: `%${title}%`
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
// 批量删除
const articleDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await Article.destroy({
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
// 文章详情
const articleDetail = async (ctx) => {
  let id = ctx.query.id  
  const project = await Article.findOne({ where: { id: id } });
  if (project === null) { 
    ctx.body = {
      code: 501,
      msg: 'Not found!',
      status: 'field'
    }
  } else {
    ctx.body = {
      code: 200,
      msg: '查询成功',
      status: 'success',
      data: project
    }
  }
}
// 文章更新
const articleUpdate = async (ctx) => {
  const articleInfo = ctx.request.body; 

  await Article.update(articleInfo, {
    where: {
      id: articleInfo.id
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
  articleCreate,
  articleList,
  articleDelete,
  articleDetail,
  articleUpdate
}