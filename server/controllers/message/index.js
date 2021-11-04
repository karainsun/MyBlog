const { message: Message } = require('../../models')
const { successResult } = require('../../utils/tools')
const { Op } = require('sequelize')
const _ = require('lodash')
const sendEmail = require('../../utils/email')

// 最新几条留言/全部留言
const newestMessage = async (ctx) => {
  let { limit } = ctx.request.query
  let options = Object.assign({}, {
    order: [
      ['created_at', 'DESC']
    ] 
  }, !limit || limit === 'undefined' ? null : { limit: Number(limit) })
  const resData = await Message.findAll(options) 
  ctx.body = successResult(resData)
}
// 留言列表
const messageList = async (ctx) => {  
  let {
    pageNo,
    pageSize,
    nickname 
  } = ctx.request.query
  nickname = (!nickname || _.isEmpty(nickname)) ? '' : nickname 

  const {
    count,
    rows
  } = await Message.findAndCountAll({
    order: [
      ['created_at', 'DESC']
    ],
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [{
        nickname: {
          [Op.like]: `%${nickname}%`
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
// 回复留言
const replyMessage = async (ctx) => {  
  const id = new Date().getTime()
  const requestBody = ctx.request.body   
  requestBody.id = id.toString()
  
  const sendOp = {
    email: requestBody.qq_email, 
    content: requestBody.content,
    m_content: requestBody.m_content,
    key: 'message'
  }

  delete requestBody.m_content

  await Promise.all([Message.create(requestBody), sendEmail(sendOp)]).then(res => {  
      return ctx.body = {
        code: 200,
        msg: '回复成功',
        status: 'success'
      }
    }).catch(error => {
      console.log('回复失败：', error.message);
      return ctx.body = {
        code: 501,
        msg: error.message,
        status: 'field'
      }
    })
}
// 批量删除
const messageDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await Message.destroy({
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
  messageList,
  replyMessage,
  messageDelete,
  newestMessage
}