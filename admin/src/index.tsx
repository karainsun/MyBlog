import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import store from './store';
import App from './App';
import { AppContainer } from 'react-hot-loader'

const render = (Component: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ConfigProvider>
    </Provider>,
    document.getElementById('root')
  );
}

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    //因为在App里使用的是export default语法，这里使用的是require,默认不会加载default的，所以需要手动加上
    const NextApp = require('./App').default;
    // 重新渲染到 document 里面
    render(NextApp);
  })
}
