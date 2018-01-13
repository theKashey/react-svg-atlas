import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { putIntoContainer, popFromContainer } from './fabric';
import { CONTEXT_ID } from './context';

const getDefaultSize = (meta, defaults = {}) => ({
  // viewBox: meta.viewBox,
  width: defaults.width || meta.width,
  height: defaults.height || meta.height,
});

const passThought = a => a;

class SVGReference extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired.isRequired,

    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.any,
    height: PropTypes.any,

    getSize: PropTypes.func,
    transformLink: PropTypes.func,

    stroke: PropTypes.any,
    fill: PropTypes.any,

    variables: PropTypes.object,
    isolation: PropTypes.bool,
  };

  static contextTypes = {
    [CONTEXT_ID]: PropTypes.any,
  };

  state = {
    xlink: undefined,
  };

  componentWillMount() {
    this.getReference(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.getReference(nextProps, () => this.releaseReference());
    }
  }

  componentWillUnmount() {
    this.releaseReference();
  }

  releaseReference = () => {
    if (this.state.event) {
      this.state.event();
    }
    popFromContainer(this.props.children, this.context);
  };

  getReference = (props, callback = passThought) => {
    const { xlink, meta, events } = putIntoContainer(props.children, this.context, this);
    const event = !meta
      ? events.on('update', ({ meta, xlink }) => this.setState({ meta, xlink }, callback))
      : callback();

    this.setState({
      xlink,
      meta,
      event,
    });
  };

  render() {
    const { className, style, stroke, fill, getSize = getDefaultSize, width, height, isolation, transformLink = passThought } = this.props;
    const { xlink: stateLink, meta } = this.state;

    const styleTag = {
      ...(style || {}),
      ...(stroke ? { stroke } : {}),
      ...(fill ? { fill } : {}),
    };

    const xlink = transformLink(stateLink, isolation);

    return xlink && meta && (
      <svg
        className={className}
        {...getSize(meta || {}, { width, height })}
        style={styleTag}
      >
        {
          ((isolation && xlink.indexOf('//') > 0) || (xlink.indexOf('#') < 0))
            ? <image href={xlink} width="100%" height="100%" />
            : <use href={xlink} width="100%" height="100%" />
        }
      </svg>
    );
  }
}

export default SVGReference;
