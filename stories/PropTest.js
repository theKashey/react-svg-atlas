import React, {Component} from 'react';
import SVG from './testSVG';
import inAtlas, {SVGAtlas} from '../src';

const TargetSVG = inAtlas(SVG);

class Test extends Component {
  state = {
    count: 3
  };

  render() {
    return (
      <div>
        <div>
          <TargetSVG text="ONE"/>
          <TargetSVG text="TWO"/>
          <TargetSVG text="THREE "/>
        </div>
        <SVGAtlas/>
      </div>
    )
  }

}

export default Test;