import React, { FC } from 'react'
import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.module.less'

interface UserSelectProps { }

const UserSelect: FC<UserSelectProps> = () => {
  const username = 'kayrain@sun'
  const content = () => {
    return (
      <div className={style.userSelect}>
        <Link to={'/setup'}>个人设置</Link>
        <div className={`${style.mouseHover} cursor-pointer pt-3`}>退出登录</div>
      </div>
    )
  }

  return (
    <div className={`${style.userSelect} mx-4`}>
      <Popover placement="bottom" content={content} trigger="click">
        <span className={`${style.mouseHover} pl-4 border-l-2 cursor-pointer`}>{username}</span>
      </Popover>
    </div>
  )
}

export default UserSelect