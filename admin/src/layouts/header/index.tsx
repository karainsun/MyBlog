import React, { FC } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/state';
import { setCollapsed } from 'store/actions';
import BreadCrumb from 'components/breadcrumb'
import './style.less'; 

const HeaderFc: FC = () => {
  const { collapsed } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();
  const toggle = (): void => {
    dispatch(setCollapsed(!collapsed));
  };
  return (
    <Layout.Header className="layout-header flex items-center" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle
      })}
      <BreadCrumb></BreadCrumb>
    </Layout.Header>
  );
};

export default HeaderFc;
