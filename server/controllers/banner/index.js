const { banner: Banner } = require('../../models') 
const _ = require('lodash')
const { Op } = require('sequelize')
const sequelize = require('../../utils/sequelize')
const { successResult } = require('../../utils/tools')

// 创建banner
const bannerCreate = async (ctx) => {  
  const requestBody = ctx.request.body; 
  await Banner.create(requestBody).then(res => {
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
// 查询全部 Banner
const bannerAll = async (ctx) => {
  const resData = await Banner.findAll({ 
    order: ['createdAt']
  })
  ctx.body = successResult(resData)
}
// 更新 Banner
const bannerUpdate = async (ctx) => {
  const requestBody = ctx.request.body;  
  await Banner.update(requestBody, {
    where: {
      id: requestBody.id
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
// 批量删除 Banner
const bannerDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await Banner.destroy({
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

module.exports = {
  bannerCreate,
  bannerAll,
  bannerUpdate,
  bannerDelete
}