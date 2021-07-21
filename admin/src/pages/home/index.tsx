import React, { FC } from 'react';
import './style.less'
import Visits from './visits'
import Weather from './weather'
import MessageBoard from './message-board'
import TopArticles from './top-articles'
import Comments from './comments'

interface HomeProps { }

const Home: FC<HomeProps> = () => {

  return (
    <div className="container">
      <ul className="grid grid-cols-6 gap-4 mb-4">
        <li className="col-span-3 shadow-md p-4"><Weather /></li>
        <li className="col-span-3 row-span-3 shadow-md p-4"><Visits /></li>
        <li className="col-span-3 row-span-2 shadow-md p-4"><MessageBoard /></li>
        <li className="col-span-4 shadow-md p-4"><TopArticles /></li>
        <li className="col-span-2 shadow-md p-4"><Comments /></li>
        {/* <li className="col-span-6 shadow-md p-4">游客头像</li>
        <li className="col-span-6 shadow-md p-4">用户分布图</li> */}
      </ul>
    </div>
  );
};

export default Home;
