import React, {
  Component,
  FC
} from 'react';

export default (loadComponent, placehodler = '加载中...') => {
  return class AsyncComponent extends Component {
    constructor() {
      super({});

      this.state = {
        Child: null
      };
      this.unmount = false;
    }

    componentWillUnmount() {
      this.unmount = true;
    }

    async componentDidMount() {
      const {
        default: Child
      } = await loadComponent();

      if (this.unmount) return;

      this.setState({
        Child
      });
    }

    render() {
      const {
        Child
      } = this.state;

      return Child ? < Child {
        ...this.props
      }
      /> : placehodler;
    }
  };
};
