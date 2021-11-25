const {
  tag: Tag, 
  category: Category, 
  article: Article, 
} = require('../../models')
const { successResult } = require('../../utils/tools')
const _ = require('lodash')
const { Op } = require('sequelize')
const sequelize = require('../../utils/sequelize')

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
      msg: '已存在同名文章',
      status: 'field'
    }
  } else {   
    await Article.create(requestBody).then(() => {
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
  let {
    pageNo,
    pageSize,
    title,
    category
  } = ctx.request.query
  title = (!title || _.isEmpty(title)) ? '' : title
  category = (!category || _.isEmpty(category)) ? '' : category
  // const categoryFilter = category ? { name: category } : null
  // const result = await sequelize.query(`SELECT count(DISTINCT article.id) as count FROM articles 
  //   AS article LEFT OUTER JOIN tags AS tags ON article.id = tags.articleId LEFT JOIN categories AS 
  //   category ON article.id = category.articleId WHERE (article.title LIKE '%%') `)
  // const count = result[0][0].count
  const { rows, count } = await Article.findAndCountAll({
    order: [
      ['top', 'DESC'], // 置顶排序
      ['created_at', 'DESC'] // 创建日期排序
    ],
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [{
        title: {
          [Op.like]: `%${title}%`
        },
        category: {
          [Op.like]: `%${category}%`
        }
      }]
    },
    // include: [
    //   { model: Tag, attributes: ['name', 'id'] },
    //   { model: Category, attributes: ['name', 'id'], where: categoryFilter } 
    // ]
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
  try { 
    // sequelize 方法删除
    for (let i = 0; i < ids.length; i++) { 
      const article = await Article.findByPk(ids[i]) 
      const tags = await article.getTags() 
      const categories = await article.getCategory() 
      for (let tag of tags) { 
        await Tag.destroy({ where: { id: tag.id } })
      }
      await Category.destroy({ where: { id: categories.id } })
      await article.destroy()
    }
    // sql 语句删除
    // const list = ids.join(',')
    // await sequelize.query(
    //   `delete category, tags, article
    //   from articles
    //   left join categories on article.id=category.articleId
    //   left join tags on article.id=tag.articleId
    //   where article.id in (${list})`
    // )
    return ctx.body = {
      code: 200,
      msg: '删除成功',
      status: 'success'
    }
  } catch (error) {
    console.log('删除失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  } 
}
// 文章详情
const articleDetail = async (ctx) => {
  let id = ctx.query.id
  const project = await Article.findOne({
    where: {
      id: id
    },
    // include: [
    //   { model: Tag, attributes: ['name'] },
    //   { model: Category, attributes: ['name'] } 
    // ]
  });
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
  try {
    const articleInfo = ctx.request.body; 
    const articleId = parseInt(articleInfo.id)
    // const tagList = articleInfo.tags.map(tag => ({ name: tag, articleId }))
    // const categoryList = { name: articleInfo.category, articleId }
    const articleRes = await Article.update(articleInfo, { where: { id: articleId } })
    // bulkCreate：批量创建，将原有关联的删除掉
    // await Tag.destroy({ where: { articleId } }) 
    // await Tag.bulkCreate(tagList)
    // await Category.destroy({ where: { articleId } })
    // await Category.create(categoryList)

    const returnValue = {
      code: 200,
      msg: '更新成功',
      status: 'success'
    }
    if (articleRes === 0) {
      returnValue.msg = '更新失败'
      returnValue.status = 'field'
    }
    return ctx.body = returnValue
  } catch (error) {
    console.log('更新失败：', error);
    ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  } 
}

module.exports = {
  articleCreate,
  articleList,
  articleDelete,
  articleDetail,
  articleUpdate
}