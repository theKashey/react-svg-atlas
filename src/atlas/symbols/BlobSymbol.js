import createSymbol from './Symbol';
import getMeta from './getMetaInformation';
import { fixXmlnsSpace, getSVGContent } from './utils';

const svgRef = id => `BLOB_SVG-${id}`;
const XML_HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';

const fix = (svg, id) => fixXmlnsSpace(svg).replace('<svg ', `<svg id="${id}" `);

const BlobSymbol = createSymbol(svgRef, function (ref) {
  const svg = ref.childNodes[0];
  const meta = getMeta(svg);
  const { viewBox } = meta;

  this.setState({ viewBox });

  const { element } = this.props;
  const id = svgRef(element.id);

  const blob = new Blob([XML_HEADER + fix(getSVGContent(svg), id)], { type: 'image/svg+xml' });
  this.blob = window.URL.createObjectURL(blob);

  element.meta = { ...meta };

  element.xlink = `${this.blob}#${id}`;
  element.updated();
}, function () {
  if (this.blob) {
    window.URL.revokeObjectURL(this.blob);
    this.blob = null;
  }
},
);

export default BlobSymbol;
