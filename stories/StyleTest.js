import React, {Component} from 'react';
import SVG from './testSVG';
import chromeTest from './chomeTest';
import inAtlas, {inIsolatedAtlas, RecomputeStyle} from '../src';

const TargetSVG = inAtlas(SVG);

const colors = [
  '000',
  'F00',
  '0F0',
  'FF0',
  '0FF'
];

class Test extends Component {
  state = {
    count: 4
  };

  add = () => this.setState({count: this.state.count + 1});
  rem = () => this.setState({count: Math.max(0, this.state.count - 1)});

  render() {
    return (
      <div>
        <button onClick={this.add}>ADD</button>
        <button onClick={this.rem}>REM</button>
        ({this.state.count})
        <div>
          {(new Array(this.state.count)).fill(0).map((x, id) =>
            <span
              style={{
                stroke: '#' + colors[id % colors.length],
                fill: '#' + colors[(id + 1) % colors.length]
              }}
              key={id}
            >
              <RecomputeStyle>
                <TargetSVG/>
              </RecomputeStyle>
              <RecomputeStyle>
                <TargetSVG isolation/>
              </RecomputeStyle>
            </span>
          )}
        </div>
      </div>
    )
  }
}

export default chromeTest(Test);