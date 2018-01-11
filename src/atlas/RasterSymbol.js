import React, {PureComponent} from 'react';
import getMeta from "./getMetaInformation";

const svgRef = id => `RASTER_SVG-${id}`;
const HEADER = 'data:image/svg+xml;base64,';

const addSpace = svg =>
  svg.indexOf('http://www.w3.org/2000/svg') > 0
    ? svg
    : svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');

const makeProps = ({style = {}}) => `style="${Object.keys(style).map(key => `${key}:${style[key]}`).join(';')}"`;

const fix = (svg, props = {}) => addSpace(svg).replace('<svg ', `<svg ${makeProps(props)} `);

class RasterSymbol extends PureComponent {
  state = {
    props: {},
    viewBox: false
  };

  setRef = (ref) => {
    if (ref) {
      const svg = ref.childNodes[0];
      const meta = getMeta(svg);
      const {viewBox, width, height} = meta;
      this.setState({
        viewBox: viewBox || `0 0 ${width} ${height}`
      });

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

        canvas.toBlob(blob => {
          this.blob = window.URL.createObjectURL(blob);

          element.meta = {...meta};

          element.xlink = `${this.blob}`;

          element.updated();
        });
      }
    }
  };

  componentWillUnmount() {
    if (this.blob) {
      window.URL.revokeObjectURL(this.blob);
      this.blob = null;
    }
  }

  render() {
    const {id, type, props} = this.props;
    const {viewBox} = this.state;
    const symbolProps = {
      ...(viewBox ? {viewBox} : {})
    };
    const Payload = type;
    return (
      <symbol id={svgRef(id)} key={id} {...symbolProps} ref={this.setRef}>
        <Payload {...props}/>
      </symbol>
    )
  }
}

export default RasterSymbol;