import React, { FC } from 'react';
import { Layout } from 'antd';

import Head from 'layouts/header';
import Side from 'layouts/side';

import Routes from 'router';

import style from './style.module.less'

const Container: FC = () => {
  return (
    <Layout>
      <Side></Side>
      <Layout className="site-layout">
        <Head></Head>
        <Layout.Content className={`${style.container} noscrollbar`}>
          <div className={style.routeSite}>
            <Routes />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Container;
