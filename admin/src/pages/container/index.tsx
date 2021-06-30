import React, { FC } from "react"
import { Layout } from 'antd'

import Head from 'layouts/header'
import Side from 'layouts/side'

import Routes from 'router'

const Container: FC = () => {
  return (
    <Layout>
      <Side></Side>
      <Layout className="site-layout">
        <Head></Head>
        <Layout.Content
          className="site-layout-background"
          style={{
            margin: '10px 10px',
            padding: 10,
            minHeight: 'calc(100vh - 84px)',
          }}
        >
          <Routes />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Container