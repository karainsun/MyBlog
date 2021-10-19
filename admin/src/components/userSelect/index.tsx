import React, { FC } from 'react'
import { Popover, message } from 'antd';
import { Link } from 'react-router-dom';
import style from './style.module.less';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from 'store/state';

interface UserSelectProps { }

const UserSelect: FC<UserSelectProps> = () => {
  const history = useHistory()
  const { userInfo } = useSelector((state: StoreState) => state);
  const content = () => {
    return (
      <div className={style.userSelect}>
        <Link to={'/setup'}>个人设置</Link>
        <div onClick={logOut} className={`${style.mouseHover} cursor-pointer pt-3`}>退出登录</div>
      </div>
    )
  }

  const logOut = () => { // TODO:后续补充退出登录接口
    localStorage.removeItem('k_token');
    message.warning('正在退出登录...', 1, () => history.push('/login'))
  }

  return (
    <div className={`${style.userSelect} mx-4`}>
      <Popover placement="bottom" content={content} trigger="click">
        <span className={`${style.mouseHover} pl-4 border-l-2 cursor-pointer`}>
          {userInfo.username}
        </span>
      </Popover>
    </div>
  )
}

export default UserSelect
