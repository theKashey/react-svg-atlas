export const svgAddXmlnsSpace = (svg) => { svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); return svg; };
export const svgSetStyle = (svg, style) => { svg.setAttribute('style', `${svg.getAttribute('style') || ''};${style}`); return svg; };
export const svgId = (svg, id) => { svg.setAttribute('id', id); return svg; };
export const svgSetDimension = (svg, { width, height, viewBox }) => {
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', viewBox);
  return svg;
};

export const svgGetStyle = ({ style = {} }) => `${Object.keys(style).map(key => `${key}:${style[key]}`).join(';')}`;

export const getSVGContent = svg => svg.outerHTML;
