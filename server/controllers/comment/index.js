const { comment: Comment } = require('../../models')
const { successResult } = require('../../utils/tools')
const { Op } = require('sequelize')
const _ = require('lodash')
const sendEmail = require('../../utils/email')

// 最新几条评论/全部评论
const newestComment = async (ctx) => {
  let { limit } = ctx.request.query
  let options = Object.assign({}, {
    order: [
      ['created_at', 'DESC']
    ] 
  }, !limit || limit === 'undefined' ? null : { limit: Number(limit) })
  const resData = await Comment.findAll(options) 
  ctx.body = successResult(resData)
}
// 评论列表
const commentList = async (ctx) => {  
  let {
    pageNo,
    pageSize,
    nickname 
  } = ctx.request.query
  nickname = (!nickname || _.isEmpty(nickname)) ? '' : nickname 

  const {
    count,
    rows
  } = await Comment.findAndCountAll({
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
// 回复评论
const replyComment = async (ctx) => { 
  const requestBody = ctx.request.body 
  
  const sendOp = {
    email: requestBody.qq_email, 
    content: requestBody.content,
    m_content: requestBody.m_content,
    post: requestBody.article_title,
    link: requestBody.article_link,
    key: 'article'
  }

  delete requestBody.m_content

  await Promise.all([Comment.create(requestBody), sendEmail(sendOp)]).then(res => {
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
const commentDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await Comment.destroy({
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
  commentList,
  replyComment,
  commentDelete,
  newestComment
}