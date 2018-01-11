import React, {Component} from 'react';
import SVG, {HomeSVG, SvgWithDef1, SvgWithDef2} from './testSVG';
import inAtlas, {SVGAtlas, SVGBlobAtlas, SVGRasterAtlas} from '../src';


const SVG1 = inAtlas(SVG);
const SVG2 = inAtlas(HomeSVG);
const SVG3 = inAtlas(SvgWithDef1);
const SVG4 = inAtlas(SvgWithDef2);

class Switch extends Component {
  state = {
    enabled: true
  };

  toggle = () => this.setState({enabled: !this.state.enabled});

  render() {
    return <div>
      {this.props.label}<br/>
      <button onClick={this.toggle}>{this.state.enabled ? 'off' : 'on'}</button>
      <br/>
      {this.state.enabled && <div>
        <this.props.component/> <br/>
        <this.props.component isolation/>
        </div>}
    </div>
  }
}


class Test extends Component {
  state = {
    count: 3
  };

  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Switch label="1" component={SVG1} />
          <Switch label="2" component={SVG2} />
          <Switch label="3" component={SVG3} />
          <Switch label="4" component={SVG4} />

        </div>
        {/*<SVGBlobAtlas/>*/}
        {/*<SVGAtlas />*/}
        <SVGAtlas />
      </div>
    )
  }

}

export default Test;