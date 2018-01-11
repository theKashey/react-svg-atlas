import React, {PureComponent} from 'react';
import getMeta from "./getMetaInformation";

const svgRef = id => `BLOB_SVG-${id}`;
const HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';

const addSpace = svg =>
  svg.indexOf('http://www.w3.org/2000/svg') > 0
    ? svg
    : svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');

const fix = (svg, id) => addSpace(svg).replace('<svg ', `<svg id="${id}" `);

class BlobSymbol extends PureComponent {
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
      const id = svgRef(element.id);
      const blob = new Blob([HEADER + fix(svg.outerHTML, id)], {type: 'image/svg+xml'});
      this.blob = window.URL.createObjectURL(blob);

      element.meta = {...meta};

      element.xlink = `${this.blob}#${id}`;
      element.updated();
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

export default BlobSymbol;