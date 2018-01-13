import createSymbol from './Symbol';
import getMeta from "./getMetaInformation";

const svgRef = id => `SVG-ATLAS-${id}`;

const LocalSymbol = createSymbol(svgRef, function (ref) {
  const svg = ref.childNodes[0];
  const meta = getMeta(svg);
  const {viewBox} = meta;

  this.setState({viewBox});

  const {element} = this.props;

  element.meta = {...meta};
  element.xlink = `#${svgRef(this.props.id)}`;
  element.updated();
});

export default LocalSymbol;
