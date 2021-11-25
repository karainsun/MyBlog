const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');  

// 开启一个 SMTP 连接池
const transport = nodemailer.createTransport(smtpTransport({
  host: "smtp.qq.com", // qq邮箱主机
  secure: true, // 使用 SSL
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: "kayrain.sun@foxmail.com", // 账号   你自定义的域名邮箱账号
    pass: "tmrdjxnrcvzliedc" // 密码   你自己开启SMPT获取的密码
  }
}));

//  发送邮件
const sendEmail = ({email, content, key, post = '', link = '', m_content}) => { 
  // 设置邮件内容
  const htmlStr = `<div style="width: 1000px;margin: auto;"><h2>
        来自<a href="https://www.kayrain.cn" target="_blank"> KBlog </a>
        的${key === 'message' ? '留言' : '评论'}回复：
      </h2>
      <div style="margin-left: 51px;">
        <p style="display: ${key === 'message' ? 'none' : 'block'}">
          <span style="font-weight: bold">文章标题：</span>
          <a href="${link}"><i>${post}</i></a>
        </p>
        <p>
          <span style="font-weight: bold">你的${key === 'message' ? '留言' : '评论'}：</span>
          <a href="${key === 'message' ? 'https://www.kayrain.cn/message' : link}" target="_blank">
            <i>${m_content}</i>
          </a>
        </p>
        <p>
          <span style="font-weight: bold">Kay的回复：</span>
          <a href="${key === 'message' ? 'https://www.kayrain.cn/message' : link}" target="_blank">
            <i>${content}</i>
          </a>
        </p>
      </div>
    </div>`;

  const mailOptions = {
    from: "kayrain.sun@foxmail.com", // 发件地址
    to: email, // 收件列表
    subject: "来自KBlog的回复", // 标题
    text: "",
    html: htmlStr // html 内容
  } 
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, function (error, response) { 
      if (error) {
        console.log("邮件发送失败: " + error);
        reject({
          status: 0,
          message: `邮件发送失败：${error}`
        }); 
      } else {
        resolve({
          status: 1,
          message: "邮件发送成功"
        }); 
      }
      // transport.close(); // 如果没用，关闭连接池
    });
  })
}

module.exports = sendEmail