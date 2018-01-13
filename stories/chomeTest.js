import React from 'react';
import {SVGLocalAtlas, SVGBlobAtlas, SVGRasterAtlas, SVGAtlasContext} from '../src';

export default chrome = (Test) => () => (
  <div>
    <SVGAtlasContext>
      <div>local: <Test/><SVGLocalAtlas/></div>
    </SVGAtlasContext>
    <SVGAtlasContext>
      <div>blob: <Test/><SVGBlobAtlas/></div>
    </SVGAtlasContext>
    <SVGAtlasContext>
      <div>raster: <Test/><SVGRasterAtlas/></div>
    </SVGAtlasContext>
  </div>
)