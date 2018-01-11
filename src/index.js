import inAtlas, {inIsolatedAtlas, constructAtlas} from './inAtlas';

import SVGReference from './SVGReference';

import SVGAtlasContext from './AtlasContext'

import SVGLocalAtlas from './atlas/LocalAtlas';
import SVGBlobAtlas from './atlas/BlobAtlas';
import SVGRasterAtlas from './atlas/RasterAtlas';

const SVGAtlas = SVGLocalAtlas;

export {
  inIsolatedAtlas, constructAtlas,

  SVGAtlas,
  SVGLocalAtlas,
  SVGBlobAtlas,
  SVGRasterAtlas,

  SVGReference,
  SVGAtlasContext
}

export default inAtlas;