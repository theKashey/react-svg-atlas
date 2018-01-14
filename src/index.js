import inAtlas, { inIsolatedAtlas, constructAtlas } from './inAtlas';

import SVGReference from './SVGReference';

import SVGAtlasContext from './AtlasContext';

import SVGLocalAtlas from './atlas/LocalAtlas';
import RealSVGBlobAtlas from './atlas/BlobAtlas';
import RealSVGRasterAtlas from './atlas/RasterAtlas';

const SVGAtlas = SVGLocalAtlas;

const isIE11 = window && document && !!window.MSInputMethodContext && !!document.documentMode;

const SVGBlobAtlas = !isIE11 ? RealSVGBlobAtlas : SVGLocalAtlas;
const SVGRasterAtlas = !isIE11 ? RealSVGRasterAtlas : SVGLocalAtlas;

export {
  inIsolatedAtlas, constructAtlas,

  SVGAtlas,
  SVGLocalAtlas,
  SVGBlobAtlas,
  SVGRasterAtlas,

  SVGReference,
  SVGAtlasContext,
};

export default inAtlas;
