import React from 'react';
import PropTypes from 'prop-types';
import SVGReference from './SVGReference';

const pickFrom = (props, keep) => (
  Object
    .keys(props)
    .reduce(
      (acc, prop) => (
        { ...acc, ...(!keep[prop] ? { [prop]: props[prop] } : {}) }
      ),
      {},
    )
);

export const constructAtlas = keepProps => (SVG) => {
  const Component = props => <SVGReference {...props}><SVG {...pickFrom(props, keepProps)} /></SVGReference>;
  Component.displayName = `${SVG.displayName || SVG.name}-in-atlas`;
  Component.propTypes = {
    ...SVGReference.propTypes,
    ...(SVG.propTypes || {}),
    children: PropTypes.any,
  };

  return Component;
};

const inAtlas = constructAtlas(SVGReference.propTypes);
export const inIsolatedAtlas = constructAtlas({});

export default inAtlas;
