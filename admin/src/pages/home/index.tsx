import React, { FC } from 'react';
import style from './style.module.less'
import Echarts from 'components/echartsTpl'
import Weather from './weather'

interface HomeProps { } 

const Home: FC<HomeProps> = () => { 

  return (
    <div className={style.container}>
      <ul className="grid grid-cols-6 gap-4">
        <li className="col-span-3 shadow-md p-4"><Weather /></li>
        <li className="col-span-3 row-span-3 shadow-md p-4"><Echarts /></li>
        <li className="col-span-3 row-span-2 shadow-md p-4">留言板</li>
        <li className="col-span-4 shadow-md p-4">推荐文章</li>
        <li className="col-span-2 shadow-md p-4">最新评论</li>
        <li className="col-span-6 shadow-md p-4">游客头像</li>
        <li className="col-span-6 shadow-md p-4">用户分布图</li>
      </ul>
    </div>
  );
};

export default Home;
