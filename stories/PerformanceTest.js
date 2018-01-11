import React, {Component} from 'react';
import Perf from 'react-addons-perf';
import SVG from './testSVG';
import inAtlas, {SVGAtlas} from '../src';

const TargetSVG = inAtlas(SVG);


class PerfCase extends Component {
  state = {
    renderCount: 0
  }

  start = () => {
    console.log('>>', this.props.name);
    this.tm = Date.now();
  }

  end = () => {
    const endTime = Date.now();
    setTimeout(() => {
      console.log(
        '<<',
        endTime - this.tm,
        Date.now() - endTime,
        Date.now() - this.tm,
        this.selfRef && this.selfRef.innerHTML.length,
        this.selfRef && this.selfRef.innerHTML.substr(0,500)
      );
    }, 1);
  };

  componentWillMount() {
    this.start()
  }

  componentDidMount() {
    this.end();
  }

  componentDidUpdate() {
    this.end();
  }

  update = () => {
    this.start();
    this.setState({
      renderCount: this.state.renderCount + 1,
      disabled: false
    });
    //this.forceUpdate();
  }

  selfRef = ref => {
    if(ref) {
      ref && console.log(this.props.name, 'in', ref.innerHTML.length, 'b')
      this.selfRef = ref;
    }
  }

  clear = () => {
    this.start();
    this.setState({
      disabled: true
    })
  }

  render() {
    const {Payload, times} = this.props;
    const {renderCount, disabled} = this.state;
    Perf.start();
    const ret = (
      <div ref={this.selfRef}>
        <button onClick={this.update}>update</button>
        <button onClick={this.clear}>clear</button>
        <div style={{height: '50px', overflow: 'scroll'}}>
          {
            !disabled && (new Array(times).fill(1).map((x, index) => <Payload key={'p' + renderCount + '-' + index}/>))
          }
          <Payload/>
        </div>
      </div>
    );
    Perf.stop();
    return ret;
  }
}

const SimpleSVGCase = () => <PerfCase name='native' times={2000} Payload={SVG}/>;
const AtlasSVGCase = () => <PerfCase name='atlas' times={2000} Payload={TargetSVG}/>;

const Case = () => (
  <div>
    <div><SimpleSVGCase/></div>
    <div><AtlasSVGCase/></div>

    <SVGAtlas/>
  </div>
);

export default Case;