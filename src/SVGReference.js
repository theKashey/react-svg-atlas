import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {putIntoContainer, popFromContainer} from './fabric';
import {CONTEXT_ID} from "./context";

const getDefaultSize = (meta, defaults = {}) => ({
  //viewBox: meta.viewBox,
  width: defaults.width || meta.width,
  height: defaults.height || meta.height
});

class SVGReference extends PureComponent {

  static propTypes = {
    children: PropTypes.element.isRequired,
    style: PropTypes.object,
    getSize: PropTypes.func,
    stroke: PropTypes.any,
    fill: PropTypes.any,
    variables: PropTypes.object,
    isolation: PropTypes.bool
  };

  static contextTypes = {
    [CONTEXT_ID]: PropTypes.any
  };

  state = {
    xlink: undefined
  };

  componentWillMount() {
    this.getReference(this.props);
  }

  componentWillUnmount() {
    this.releaseReference();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children === nextProps.children) {
      this.releaseReference();
      this.getReference(nextProps);
    }
  }

  releaseReference = () => {
    this.state.event && this.state.event();
    popFromContainer(this.props.children, this.context);
  };

  getReference = (props) => {
    const {xlink, meta, events} = putIntoContainer(props.children, this.context, this);
    this.setState({
      xlink,
      meta,
      event: !meta && events.on('update', ({meta, xlink}) => this.setState({meta, xlink}))
    });
  };

  render() {
    const {className, style, stroke, fill, getSize = getDefaultSize, width, height, isolation} = this.props;
    const {xlink, meta} = this.state;

    const styleTag = {
      ...(style ? style : {}),
      ...(stroke ? {stroke} : {}),
      ...(fill ? {fill} : {})
    };

    return xlink && meta && (
      <svg
        className={className}
        {...getSize(meta || {}, {width, height})}
        style={styleTag}
      >
        {
          (isolation && xlink.indexOf('//') > 0 || (xlink.indexOf('#') < 0))
            ? <image href={xlink} width="100%" height="100%"/>
            : <use href={xlink} width="100%" height="100%"/>
        }
      </svg>
    ) || null;
  }
}

export default SVGReference;
