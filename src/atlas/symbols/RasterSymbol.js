import createSymbol from './Symbol';
import getMeta from "./getMetaInformation";
import {fixXmlnsSpace} from "./utils";

const HEADER = 'data:image/svg+xml;base64,';
const makeProps = ({style = {}}) => `style="${Object.keys(style).map(key => `${key}:${style[key]}`).join(';')}"`;

const fix = (svg, props = {}) => fixXmlnsSpace(svg).replace('<svg ', `<svg ${makeProps(props)} `);

const svgRef = id => `RASTER_SVG-${id}`;

const RasterSymbol = createSymbol(svgRef, function (ref) {
    const svg = ref.childNodes[0];
    const meta = getMeta(svg);
    const {viewBox, width, height} = meta;
    this.setState({viewBox});

    const {element} = this.props;

    const url = HEADER + btoa(fix(svg.outerHTML, this.props.props));
    const img = new Image();
    element.meta = {...meta};
    img.src = url;

    img.onload = function () {
      const factor = window.devicePixelRatio;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.width = canvas.width = width * factor;
      context.height = canvas.height = height * factor;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        this.blob = window.URL.createObjectURL(blob);

        element.meta = {...meta};

        element.xlink = `${this.blob}`;

        element.updated();
      });
    }
    img.onerror = function () {
      const id = svgRef(element.id);
      
      this.blob = window.URL.createObjectURL(blob);
      element.xlink = `${this.blob}#${id}`;
      element.updated();
    }
  }, function () {
    if (this.blob) {
      window.URL.revokeObjectURL(this.blob);
      this.blob = null;
    }
  }
);

export default RasterSymbol;
