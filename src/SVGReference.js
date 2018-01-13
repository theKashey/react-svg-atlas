import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { putIntoContainer, popFromContainer, elementsAreEqual } from './fabric';
import { CONTEXT_ID } from './context';

const getDefaultSize = (meta, defaults = {}, preserveAspectRatio) => {
  const result = {
    // viewBox: meta.viewBox,
    width: defaults.width || meta.width,
    height: defaults.height || meta.height,
  };

  if (preserveAspectRatio) {
    const { aspect } = meta;

    if (result.width !== meta.width) {
      result.height = result.width * aspect;
    }

    if (result.height !== meta.height) {
      result.width = result.height * aspect;
    }
  }

  return result;
};

const passThought = a => a;

class SVGReference extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,

    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.any,
    height: PropTypes.any,
    preserveAspectRatio: PropTypes.bool,

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

  eventHandler = null;

  componentWillMount() {
    this.getReference(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    if (!elementsAreEqual(children, nextProps.children)) {
      this.removeEventHandler();
      this.getReference(nextProps, () => popFromContainer(children, this.context));
    }
  }

  componentWillUnmount() {
    this.releaseReference();
  }

  releaseReference = () => {
    this.removeEventHandler();
    popFromContainer(this.props.children, this.context);
  };

  getReference = (props, callback = passThought) => {
    const { xlink, meta, events } = putIntoContainer(props.children, this.context, this);
    this.eventHandler = !meta
      ? events.on('update', ({ meta, xlink }) => this.setState({ meta, xlink }, callback))
      : callback();

    this.setState({
      xlink,
      meta,
    });
  };

  removeEventHandler() {
    if (this.eventHandler) {
      this.eventHandler();
      this.eventHandler = null;
    }
  }

  render() {
    const {
      className, style, stroke, fill,
      getSize = getDefaultSize, width, height, preserveAspectRatio,
      isolation,
      transformLink = passThought,
    } = this.props;
    const { xlink: stateLink, meta } = this.state;

    const styleTag = {
      ...(style || {}),
      ...(stroke ? { stroke } : {}),
      ...(fill ? { fill } : {}),
    };

    const xlink = stateLink && transformLink(stateLink, isolation);

    return xlink && meta && (
      <svg
        className={className}
        {...getSize(meta || {}, { width, height }, preserveAspectRatio, getDefaultSize)}
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
