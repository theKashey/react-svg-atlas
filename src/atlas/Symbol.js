import React, {PureComponent} from 'react';

const svgRef = (id) => `SVG-REF-${id}`;

class Symbol extends PureComponent {
  state = {
    props: {},
    viewBox: false
  };

  setRef = (ref) => {
    if (ref) {
      const svg = ref.childNodes[0];
      const viewBox = svg.getAttribute('viewBox');
      const VB = (viewBox || "0 0 32 32").split(' ');
      const width = svg.getAttribute('width') || (+VB[2]);
      const height = svg.getAttribute('height') || (+VB[3]);
      const aspect = width / height;
      this.setState({
        viewBox: viewBox || `0 0 ${width} ${height}`
      });

      this.props.element.meta = {
        viewBox,
        width,
        height,
        aspect
      };
      this.props.element.xlink = `#${svgRef(this.props.id)}`;

      this.props.element.updated();
    }
  };

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

export default Symbol;