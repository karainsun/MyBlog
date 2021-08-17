const User = require('../../models/user')
const { successResult } = require('../../utils/tools')
const _ = require('lodash')
const { Op } = require('sequelize')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
// 新建用户
const userRegister = async (ctx) => { 
  const { username, email, password, invitationCode }  = ctx.request.body
  const hasName = await User.findOne({
    where: {
      username: username
    }
  })
  const hasEmail = await User.findOne({
    where: {
      email: email
    }
  })
  if (hasName) {
    ctx.body = {
      code: 200,
      msg: '已存在此用户名',
      status: 'field'
    }
  } else if (hasEmail) {
    ctx.body = {
      code: 200,
      msg: '一个邮箱仅可注册一次',
      status: 'field'
    }
  } else {
    let isAdmin = false;
    if (!_.isEmpty(invitationCode) && invitationCode === 'kay1994') {
      isAdmin = true
    } else if (!_.isEmpty(invitationCode) && invitationCode !== 'kay1994') {
      return ctx.body = {
        code: 200,
        msg: '邀请码不正确！',
        status: 'field'
      }
    }
    await User.create({
      username: username,
      password: password,
      email: email,
      is_admin: isAdmin
    }).then(res => {
      return ctx.body = {
        code: 200,
        msg: '注册成功',
        status: 'success'
      }
    }).catch(error => { 
      return ctx.body = {
        code: 501,
        msg: error.message,
        status: 'field'
      }
    })
  } 
}
// 用户登录
const userLogin = async (ctx) => {
  const { username, password }  = ctx.request.body
  const user = await User.findOne({
    where: {
      username: username
    }
  }) 
  const fieldRes = {
    code: 200,
    msg: '用户名或密码错误！', // 尽量不提示某个错误
    status: 'field'
  }
  if(user) {
    const isVaild = bcryptjs.compareSync(password, user.password)
    if (!isVaild) {
      ctx.body = fieldRes
    } else { 
      if(!user.status) {
        return ctx.body = {
          code: 200,
          msg: '此账号已被禁用！', 
          status: 'field'
        }
      }
      const userInfo = {...user}.dataValues;
      delete userInfo.created_at; // 删除创建时间和密码
      delete userInfo.password;

      const token = jwt.sign({
        name: userInfo.username,
        id: userInfo.id,
        is_admin: userInfo.is_admin
      }, // 加密 Token
      'k_token', {
        expiresIn: '1h'
      });
      ctx.body = {
        code: 200,
        msg: '登录成功！',
        data: {
          userInfo: userInfo,
          token: token
        },
        status: 'success'
      }
    }
  } else {
    ctx.body = fieldRes
  } 
}
// 用户列表
const userList = async (ctx) => {
  let { pageNo, pageSize, username, email } = ctx.request.query

  username = (!username || _.isEmpty(username)) ? '' : username 
  email = (!email || _.isEmpty(email)) ? '' : email 

  const { count, rows } = await User.findAndCountAll({
    limit: Number(pageSize),
    offset: (Number(pageNo) - 1) * Number(pageSize),
    where: {
      [Op.and]: [{
        username: { [Op.like]: `%${username}%` },
        email: { [Op.like]: `%${email}%` }
      }]
    }
  })

  let newRows = JSON.parse(JSON.stringify(rows)).map((item) => {
    let {password, ...obj} = item
    return obj
  })

  const resData = {
    list: newRows,
    meta: {
      count: count,
      total_pages: Math.ceil(count / pageSize),
    }
  }
  ctx.body = successResult(resData)
}
// 用户删除
const userDelete = async (ctx) => {
  const { ids } = ctx.request.body;
  await User.destroy({
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
// 更改用户权限和状态
const userRoleStatus = async (ctx) => {
  const { id, key, roleStatus } = ctx.request.body; 
  const condition = key === 'role' ? { is_admin: roleStatus } : { status: roleStatus }

  await User.update(condition, {
    where: {
      id: id
    }
  }).then(res => {  
    const returnValue = {
      code: 200,
      msg: '操作成功',
      status: 'success'
    }
    if (res === 0 ) {
      returnValue.msg = '操作失败'
      returnValue.status = 'field'
    }
    return ctx.body = returnValue
  }).catch(error => {
    console.log('操作失败：', error.message);
    return ctx.body = {
      code: 501,
      msg: error.message,
      status: 'field'
    }
  })
}
// 用户详情
const userDetail = async (ctx) => {
  let id = ctx.query.id  
  const user = await User.findOne({ where: { id: id } });
  if (user === null) { 
    ctx.body = {
      code: 501,
      msg: 'Not found!',
      status: 'field'
    }
  } else {
    const newUser = { ...user }.dataValues
    delete newUser.password
    ctx.body = {
      code: 200,
      msg: '查询成功',
      status: 'success',
      data: newUser
    }
  }
}
// 用户信息更新
const userUpdate = async (ctx) => {
  const userInfo = ctx.request.body; 

  await User.update(userInfo, {
    where: {
      id: userInfo.id
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
  userRegister,
  userLogin,
  userList,
  userDelete,
  userRoleStatus,
  userDetail,
  userUpdate
}