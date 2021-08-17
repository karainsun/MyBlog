const qiniu = require('qiniu');
// 引入key文件
const qiniuConfig = require('../config/qiniuConfig')
const upToQiniu = (filePath, key) => {

  const accessKey = qiniuConfig.accessKey
  const secretKey = qiniuConfig.secretKey
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  const options = {
    scope: qiniuConfig.bucket,
    // callbackUrl: 'http://api.example.com/qiniu/upload/callback',
    // callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    // callbackBodyType: 'application/json'
  }

  const putPolicy = new qiniu.rs.PutPolicy(options);
  // 生成token 作为个人七牛云账号的识别标识
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config()
  // 空间对应的机房 一定要按自己属区Zone对象
  config.zone = qiniu.zone.Zone_z2

  const localFile = filePath
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  // 文件上传
  return new Promise((resolved, reject) => {
    // 以文件流的形式进行上传
    // uploadToken是token， key是上传到七牛后保存的文件名, localFile是流文件
    // putExtra是上传的文件参数，采用源码中的默认参数
    formUploader.putStream(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      } else {
        resolved(respBody)
      }
    })
  })
}

module.exports = {
  upToQiniu
}