import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CONTEXT_ID, createContext } from './context';

class AtlasContext extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static childContextTypes = {
    [CONTEXT_ID]: PropTypes.any,
  };

  svgContext = createContext();

  getChildContext() {
    return {
      [CONTEXT_ID]: this.svgContext,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default AtlasContext;
