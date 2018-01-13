import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CONTEXT_ID, createContext } from './context';

class AtlasContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    [CONTEXT_ID]: PropTypes.any,
  };

  getChildContext() {
    return {
      [CONTEXT_ID]: this.svgContext,
    };
  }

  svgContext = createContext();

  render() {
    return React.Children.only(this.props.children);
  }
}

export default AtlasContext;
