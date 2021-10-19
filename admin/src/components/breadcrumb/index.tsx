import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import routes from 'router/config'
import { routerFlatten, arrToObj } from 'utils'
import style from './style.module.less'

const routesFlat = arrToObj(routerFlatten(routes, 'children'))

const CustomBread: FC = () => {
  const { pathname } = useLocation()

  const pathSnippets = pathname.split("/").filter((i) => i).map(i => '/' + i);
  if (pathSnippets.length > 1) {
    pathSnippets.splice(pathSnippets.length - 1, 1, pathname)
  }
  return (<div className={style.breadcrumb}>
    <Breadcrumb separator="•">
      <Breadcrumb.Item><Link to={'/'}><HomeOutlined style={{ marginTop: '-3px' }}/></Link></Breadcrumb.Item>
      {
        pathSnippets.map((item, index) => {
          return <Breadcrumb.Item key={index}>{routesFlat[item]}</Breadcrumb.Item>
        })
      }
    </Breadcrumb>
  </div>)
}

export default CustomBread
