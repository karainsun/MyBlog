import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import routes from 'router/config'
import { flatten, arrToObj } from 'utils'
import './style.less'

const routesFlat = arrToObj(flatten(routes, 'children'))

const CustomBread: FC = () => {
  const { pathname } = useLocation()

  const pathSnippets = pathname.split("/").filter((i) => i).map(i => '/' + i);
  if (pathSnippets.length > 1) {
    pathSnippets.splice(pathSnippets.length - 1, 1, pathname)
  }
  return (<div className="breadcrumb">
    <Breadcrumb>
      <Breadcrumb.Item><Link to={'/'}><HomeOutlined/></Link></Breadcrumb.Item>
      {
        pathSnippets.map((item, index) => {
          return <Breadcrumb.Item key={index}>{routesFlat[item]}</Breadcrumb.Item>
        })

      }
    </Breadcrumb>
  </div>)
}

export default CustomBread