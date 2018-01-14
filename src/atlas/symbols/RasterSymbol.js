import createSymbol from './Symbol';
import getMeta from './getMetaInformation';
import { fixXmlnsSpace, getSVGContent } from './utils';

const HEADER = 'data:image/svg+xml;base64,';
const XML_HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';

const makeProps = ({ style = {} }) => `style="${Object.keys(style).map(key => `${key}:${style[key]}`).join(';')}"`;

const fix = (svg, props = {}) => fixXmlnsSpace(svg).replace('<svg ', `<svg ${makeProps(props)} `);

const svgRef = id => `RASTER_SVG-${id}`;

const toBlob = (canvas, callback, onerror) => {
  try {
    /* eslint-disable no-unused-expressions */
    (canvas.toBlob && canvas.toBlob(callback)) ||
    // (canvas.msToBlob && canvas.msToBlob(callback)) ||
    onerror();
    /* eslint-enable */
  } catch (e) {
    onerror();
  }
};

const RasterSymbol = createSymbol(svgRef, function (ref) {
  const svg = ref.childNodes[0];
  const meta = getMeta(svg);
  const { viewBox, width, height } = meta;
  this.setState({ viewBox });

  const { element } = this.props;

  const resultSVG = fix(getSVGContent(svg), this.props.props);
  const url = HEADER + btoa(resultSVG);
  const img = new Image();
  element.meta = { ...meta };
  img.src = url;

  img.onload = function () {
    const factor = window.devicePixelRatio;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.width = canvas.width = width * factor;
    context.height = canvas.height = height * factor;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    toBlob(canvas, (blob) => {
      this.blob = window.URL.createObjectURL(blob);

      element.meta = { ...meta };

      element.xlink = `${this.blob}`;

      element.updated();
    }, () => img.onerror());
  };
  img.onerror = function () {
    const id = svgRef(element.id);
    const blob = new Blob([XML_HEADER + resultSVG], { type: 'image/svg+xml' });
    this.blob = window.URL.createObjectURL(blob);
    element.xlink = `${this.blob}#${id}`;
    element.updated();
  };
}, function () {
  if (this.blob) {
    window.URL.revokeObjectURL(this.blob);
    this.blob = null;
  }
},
);

export default RasterSymbol;
