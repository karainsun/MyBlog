const {
  tag: Tag, 
  category: Category, 
  article: Article, 
  user: User, 
  tourist: Tourist, 
  comment: Comment, 
  collect_category: CollectCategory, 
  collect: Collect,
  banner: Banner,
  message: Message
} = require('../../models')
const { successResult } = require('../../utils/tools')
const _ = require('lodash')
const { Op } = require('sequelize')
const sequelize = require('../../utils/sequelize')

// 文章列表
const articleList = async (ctx) => {
  let { pageNo, pageSize, title } = ctx.request.query
  title = (!title || _.isEmpty(title)) ? '' : title
  const { count, rows } = await Article.findAndCountAll({
    order: [
      ['created_at', 'DESC']
    ], // 倒序取最新
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [{
        title: {
          [Op.like]: `%${title}%`
        }
      }]
    },
    include: [
      { model: Tag, attributes: ['name', 'id'] },
      { model: Category, attributes: ['name', 'id'] } 
    ]
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
// 最新五条/全部文章
const articleArchives = async (ctx) => {
  let { limit } = ctx.request.query
  let options = Object.assign({}, {
    order: [
      ['created_at', 'DESC']
    ],
    include: [
      { model: Tag, attributes: ['name', 'id'] },
      { model: Category, attributes: ['name', 'id'] } 
    ]
  }, !limit || limit === 'undefined' ? null : { limit: Number(limit) })
  const resData = await Article.findAll(options) 
  ctx.body = successResult(resData)
}
// 个人信息
const userInfo = async (ctx) => {
  const user = await User.findOne({
    where: {
      username: '' // 指定要返回的用户到前台主页
    }
  });
  if (user === null) {
    ctx.body = {
      code: 501,
      msg: 'Not found!',
      status: 'field'
    }
  } else {
    const newUser = {
      ...user
    }.dataValues
    delete newUser.password
    ctx.body = {
      code: 200,
      msg: '查询成功',
      status: 'success',
      data: newUser
    }
  }
}
// 查询全部标签
const tagAll = async (ctx) => {
  const resData = await Tag.findAll({
    order: [
      ['created_at', 'DESC']
    ]
  })
  ctx.body = successResult(resData)
}
// 查询全部分类
const categoryAll = async (ctx) => {
  const resData = await Category.findAll({
    order: [
      ['created_at', 'DESC']
    ]
  })
  ctx.body = successResult(resData)
}
// 文章详情
const postDetail = async (ctx) => {
  let id = ctx.query.id  
  const left = await sequelize.query(`select id, title from articles where id = (select id from articles where id > ${id} order by id desc limit 1); `)
  const right = await sequelize.query(`select id, title from articles where id = (select id from articles where id < ${id} order by id desc limit 1); `)

  const project = await Article.findOne({ 
    where: { id: id },
    include: [
      { model: Tag, attributes: ['name', 'id'] },
      { model: Category, attributes: ['name', 'id'] } 
    ]
  });
  if (project === null) { 
    ctx.body = {
      code: 501,
      msg: 'Not found!',
      status: 'field'
    }
  } else {
    project.image = project.image[0].url
    project.dataValues.adjacent = { left: right[0], right: left[0]}
    ctx.body = {
      code: 200,
      msg: '查询成功',
      status: 'success',
      data: project
    }
  }
}
// 游客登录
const touristLogin = async (ctx) => {
  const { nickname, qq_email, blog }  = ctx.request.body
   
  const has = await Tourist.findOne({
    where: { 
      [Op.and]: [{
        nickname: nickname,
        qq_email: qq_email
      }]
    }
  })
   
  if(has) { 
    return ctx.body = {
      code: 200,
      msg: '登录成功',
      status: 'success',
      data: has.dataValues
    }
  } else {
    const qq = qq_email.split("@")[0];
    const avatar = `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`;
    await Tourist.create({ nickname, qq_email, blog, avatar }).then(res => { 
      return ctx.body = {
        code: 200,
        msg: '登录成功',
        status: 'success',
        data: res.dataValues
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
// 发表评论
const makeComment = async (ctx) => { 
  const requestBody = ctx.request.body

  await Comment.create(requestBody).then(res => { 
    return ctx.body = {
      code: 200,
      msg: '发表成功',
      status: 'success'
    }
  }).catch(error => {
    console.log('发表失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  })
}
// 根据文章id查询评论
const getComment = async (ctx) => {
  const { articleId } = ctx.request.query
  const resData = await Comment.findAll({
    // order: [
    //   ['created_at', 'DESC']
    // ],
    where: {
      [Op.and]: [{
        articleId: articleId
      }]
    }
  })
  ctx.body = successResult(resData)
}
// 查询全部收藏分类
const collectCategoryAll = async (ctx) => {
  const resData = await CollectCategory.findAll({ 
    order: ['createdAt'],
    attributes: ['id', 'name', 'createdAt']
  })
  ctx.body = successResult(resData)
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
// 查询全部 Banner
const bannerList = async (ctx) => {
  const resData = await Banner.findAll({ 
    order: ['createdAt']
  })
  ctx.body = successResult(resData)
}
// 留言
const makeMessage = async (ctx) => { 
  const id = new Date().getTime()
  const requestBody = ctx.request.body 
  requestBody.id = id.toString()
  await Message.create(requestBody).then(res => { 
    return ctx.body = {
      code: 200,
      msg: '留言成功',
      status: 'success'
    }
  }).catch(error => {
    console.log('发表失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  })
}
// 根据前台用户id查询留言
const getMessage = async (ctx) => {
  const { userId } = ctx.request.query
  const resData = await Message.findAll({ 
    where: {
      [Op.and]: [{
        userId
      }]
    }
  })
  ctx.body = successResult(resData)
}

module.exports = {
  articleList,
  articleArchives,
  userInfo,
  tagAll,
  categoryAll,
  postDetail,
  touristLogin,
  makeComment,
  getComment,
  collectCategoryAll,
  collectList,
  bannerList,
  makeMessage,
  getMessage
}