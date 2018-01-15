import React from 'react';
import {SVGLocalAtlas, SVGBlobAtlas, SVGRasterAtlas, SVGAtlasContext} from '../src';

export default (Test) => () => (
  <div>
    <SVGAtlasContext>
      <div><SVGLocalAtlas/> local: <Test/></div>
    </SVGAtlasContext>
    <SVGAtlasContext>
      <div>blob: <Test/><SVGBlobAtlas/></div>
    </SVGAtlasContext>
    <SVGAtlasContext>
      <div>raster: <Test/><SVGRasterAtlas/></div>
    </SVGAtlasContext>
  </div>
)