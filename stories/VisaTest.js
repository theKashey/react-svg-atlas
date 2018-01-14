import React, {Component} from 'react';
import {SvgWithDef1} from './testSVG';
import inAtlas, {SVGLocalAtlas, SVGBlobAtlas, SVGRasterAtlas, SVGAtlasContext} from '../src';


const SVG = inAtlas(SvgWithDef1);


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
              <SVG/>
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

export default Test;