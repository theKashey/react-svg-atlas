import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SVG, {StarSVG2, HomeSVG, SvgWithDef1, SvgWithDef2} from './testSVG';
import chromeTest from './chomeTest';
import inAtlas, {SVGLocalAtlas, SVGBlobAtlas, SVGRasterAtlas, SVGAtlasContext} from '../src';


const SVG1 = inAtlas(SVG);
const SVG1_1 = inAtlas(StarSVG2);
const SVG2 = inAtlas(HomeSVG);
const SVG3 = inAtlas(SvgWithDef1);
const SVG4 = inAtlas(SvgWithDef2);

const SVG5 = inAtlas(SvgWithDef1);

class XSwitch extends Component {

  static childContextTypes = {
    xstate: PropTypes.any,
  };
  state = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
  }

  getChildContext() {
    return {
      xstate: {
        setState: (...args) => this.setState(...args),
        getState: () => this.state
      }
    };
  }

  toggle = (id) => () => this.setState({[id]: !this.state[id]})

  render() {
    return <div>
      {
        new Array(this.props.count)
          .fill(1)
          .map((x, id) => (
            <button key={id} onClick={this.toggle(id + 1)}>
              {this.state[id + 1] ? 'off' : 'on'}
            </button>
          ))
      }
      {this.props.children}
    </div>
  }
}

class Switch extends Component {

  static contextTypes = {
    xstate: PropTypes.any,
  };

  state = {
    enabled: true
  };

  render() {
    const isEnabled = this.context.xstate.getState()[this.props.label];
    return <div>
      {this.props.label}<br/>
      {isEnabled && <div>
        <this.props.component {...this.props} />
        <br/>
        <this.props.component {...this.props} isolation/>
      </div>}
    </div>
  }
}

const setVisaLink = xlink => {
  const [link, href] = xlink.split('#');
  return `${link}#visa_id`;
};


const TestCase = ({atlas}) => (
  <div style={{display: 'flex'}} key={atlas}>
    <Switch label="1" atlasId={atlas} component={SVG1} height={50} preserveAspectRatio/>
    <Switch label="2" atlasId={atlas} component={SVG1_1} height={50} preserveAspectRatio/>
    <Switch label="3" atlasId={atlas} component={SVG2} height={50}/>
    <Switch label="4" atlasId={atlas} component={SVG3}/>
    <Switch label="5" atlasId={atlas} component={SVG4}/>
    <Switch label="6" atlasId={atlas} component={SVG5} transformLink={setVisaLink}/>
  </div>
);

class Test extends Component {
  state = {
    count: 3,
    atlas: 1
  };

  changeAtlas = (event) => {
    this.setState({atlas: event.target.value})
  };

  render() {
    const {atlas} = this.state;
    return (
      <div>
        {[
          <SVGAtlasContext key={atlas}>
            <div>
              <select onChange={this.changeAtlas}>
                <option value={1} selected={1 == atlas}>Local</option>
                <option value={2} selected={2 == atlas}>Blob</option>
                <option value={3} selected={3 == atlas}>Raster</option>
              </select>
              <TestCase atlas={atlas}/>
              :{atlas}
              {atlas == 1 && <SVGLocalAtlas/>}
              {atlas == 2 && <SVGBlobAtlas/>}
              {atlas == 3 && <SVGRasterAtlas/>}
            </div>
          </SVGAtlasContext>
        ]}
      </div>
    )
  }
}

const Chome = chromeTest(TestCase);

export default () => <XSwitch count={6}><Chome/></XSwitch>;
//export default Test;