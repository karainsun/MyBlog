import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/state';
import { setCollapsed } from 'store/actions';
import './style.less';

const HeaderFc = () => {
  const { collapsed } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();
  const toggle = (): void => {
    dispatch(setCollapsed(!collapsed));
  };
  return (
    <Layout.Header className="layout-header" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle
      })}
    </Layout.Header>
  );
};

export default HeaderFc;
