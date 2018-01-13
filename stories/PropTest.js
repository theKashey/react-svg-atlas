import React, {Component} from 'react';
import SVG from './testSVG';
import chromeTest from './chomeTest';
import inAtlas from '../src';

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
      </div>
    )
  }

}

export default chromeTest(Test);