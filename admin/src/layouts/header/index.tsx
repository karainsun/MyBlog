import React, { FC, useState } from 'react';
import { Layout, Row, Col, Avatar, Image } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, SkinOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import screenfull from 'screenfull';
import { StoreState } from 'store/state';
import { setCollapsed } from 'store/actions';
import BreadCrumb from 'components/breadcrumb'
import Search from 'components/searchBox'
import UserSelect from 'components/userSelect';
// import ThemeBox from 'components/themebox';
import style from './style.module.less';

const HeaderFc: FC = () => {
  const { collapsed } = useSelector((state: StoreState) => state);
  const [isFull, setIsFull] = useState(false)

  const dispatch = useDispatch();

  const toggleMenu = (): void => {
    dispatch(setCollapsed(!collapsed));
  };

  const fullScreen = (): void => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFull(!isFull)
    }
  }

  return (
    <Layout.Header className={style.layoutHeader}>
      <Row>
        <Col span={7}>
          <div className="flex items-center">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: style.trigger,
              onClick: toggleMenu
            })}
            <BreadCrumb></BreadCrumb>
          </div>
        </Col>
        <Col span={17}>
          <div className="flex justify-end items-center" style={{ height: '50px' }}>
            <Search />
            <SkinOutlined className={style.pointHover} title="换肤" />
            {React.createElement(isFull ? FullscreenExitOutlined : FullscreenOutlined, {
              className: `${style.pointHover} mx-8`,
              onClick: fullScreen,
              title: isFull ? "复原" : "全屏"
            })}
            <Avatar
              src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            />
            <UserSelect></UserSelect>
          </div>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default HeaderFc;
