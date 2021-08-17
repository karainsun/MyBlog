const router = require('koa-router')()
// const statusCode = require("../utils/statusCode");
// 为文件进行命名（唯一标识）
const uuid = require("uuid");
const fs = require("fs");

const qiniuConfig = require('../../config/qiniuConfig')
// func是封装的上传图片到七牛云代码
const { upToQiniu } = require("../../utils/upload");

router.post('/upload', async (ctx) => { 
  try {
    // 前端必须以formData格式进行文件的传递
    const file = ctx.request.files.file; // 获取上传文件
    if (file) {
      // 命名文件
      const fileName = uuid.v1(); 
      // 创建文件可读流
      const reader = fs.createReadStream(file.path);
      // 获取上传文件扩展名
      const ext = file.name.split(".").pop();
      // 命名文件以及拓展名
      const fileUrl = `${fileName}.${ext}`;
      // 调用方法(封装在utils文件夹内)
      const result = await upToQiniu(reader, fileUrl); 
      if (!result.error) {
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '上传成功',
          status: 'success',
          data: {
            name: result.key,
            url: `http://${qiniuConfig.origin}/${result.key}`
          }
        }
      } else {
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: '上传失败',
          status: 'field'
        }
      }
    } else {
      ctx.response.status = 400;
      ctx.body = {
        code: 400,
        msg: '没有选择照片',
        status: 'field'
      }
    }
  } catch (err) {
    ctx.response.status = 404;
    ctx.body = {
      code: 404,
      msg: '网络错误',
      status: 'field'
    }
  }
})

module.exports = router