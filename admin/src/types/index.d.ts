/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare module 'redux-persist';
declare module 'redux-persist/lib/storage';
declare module 'antd';
declare module '@ant-design/icons';
declare module 'antd/lib/locale/zh_CN';
declare module 'react-transition-group';
declare module 'echarts-for-react';
declare module 'wangeditor-for-react';
declare module 'assets/images/*';
declare module 'assets/fonts/*';
declare module "*.less" {
  const css: { [key: string]: string };
  export default css;
}

interface ReduxProps {
  storeData?: Record<string, any>;
  setStoreData?: (type: string, payload: any) => object;
}

type CommonObjectType<T = any> = Record<string, T>;
