import React, { Component } from 'react';
import PropTypes from 'prop-types';
import passDownStyles from './passDownStyles';

const pickStyles = styles => (
  Array.from(styles)
  // .keys(styles)
    .filter(key => passDownStyles[key])
    .reduce((acc, key) => {
      acc[key] = styles.getPropertyValue(key);
      return acc;
    }, {})
);

class RecomputeStyle extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    measured: null,
  };

  setRef = (ref) => {
    if (ref) {
      const styles = window.getComputedStyle(ref);
      this.setState({
        measured: pickStyles(styles),
      });
    }
  }

  render() {
    const { children, ...rest } = this.props;
    const { measured } = this.state;

    return (
      measured
        ? React.cloneElement(children, {
          ...rest,
          style: {
            ...measured,
            ...(rest.style || {}),
          },
        })
        : <span className={rest.className} ref={this.setRef} />
    );
  }
}

export default RecomputeStyle;
