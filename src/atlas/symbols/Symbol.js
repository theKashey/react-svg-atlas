import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const createSymbol = (svgRef, setRef, onUnmount) => {
  class Symbol extends PureComponent {
    static propTypes = {
      id: PropTypes.number,
      props: PropTypes.object,
      type: PropTypes.func,
    }

    state = {
      props: {},
      viewBox: false,
    };

    componentWillUnmount() {
      if (onUnmount) {
        onUnmount.call(this);
      }
    }

    setRef = (ref) => {
      if (ref) {
        setRef.call(this, ref);
      }
    }

    render() {
      const { id, type: Payload, props } = this.props;
      const { viewBox } = this.state;
      const symbolProps = {
        ...(viewBox ? { viewBox } : {}),
      };
      return (
        <symbol id={svgRef(id)} key={id} {...symbolProps} ref={this.setRef}>
          <Payload {...props} />
        </symbol>
      );
    }
  }
  return Symbol;
};

export default createSymbol;
