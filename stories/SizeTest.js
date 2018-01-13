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
          <TargetSVG width="50px"/>
          <TargetSVG height="50px"/>
          <TargetSVG getSize={(meta) => ({width: meta.width * 0.5, height: meta.height * 0.5})}/>
        </div>
      </div>
    )
  }

}

export default chromeTest(Test);