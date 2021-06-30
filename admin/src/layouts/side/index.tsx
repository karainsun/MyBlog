import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import routes, { RouteProps } from 'router/config'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { StoreState } from 'store/state' 
import './style.less'

type arr = Array<string | undefined>

const { SubMenu } = Menu
const flatRoutes = routes.filter(item => item.type === 'subMenu')

let rootSubmenuKeys: arr = []
flatRoutes.forEach((e: RouteProps) => rootSubmenuKeys.push(e.path)) 
const Side = () => {
  const { pathname } = useLocation()
  const { collapsed } = useSelector((state: StoreState) => state)
  const [openKeys, setOpenkeys] = useState<arr>([])
  // const [rootSubmenuKeys, setrootSubmenuKeys] = useState<arr>([])

  const renderMenu = (list: RouteProps[]): JSX.Element[] => {
    return list.map((item): any => {
      if (item.children && item.type === 'subMenu') {
        return (
          <SubMenu key={item.key} title={item.name} icon={<item.icon />}>
            {
              renderMenu(item.children)
            }
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key} title={item.name} icon={item.type === 'menuItem' ? '' : <item.icon />}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        )
      }
    })
  }

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenkeys(keys);
    } else {
      setOpenkeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu className="menu scrollbar" theme="dark" mode="inline" onOpenChange={onOpenChange} openKeys={openKeys} defaultSelectedKeys={pathname}>
        {renderMenu(routes)}
      </Menu>
    </Layout.Sider>
  )
}

export default Side