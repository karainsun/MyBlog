import React, { FC, useEffect } from 'react'; 
import './style.css'

const Home: FC = () => {

  useEffect(() => {
    console.log('首页');
  }, [])

  return <div className="w-80">
    <a className="btn">Home1</a>
  </div>;
};

export default Home;
