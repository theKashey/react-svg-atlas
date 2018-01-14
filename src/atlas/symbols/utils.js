export const fixXmlnsSpace = svg =>
  (svg.indexOf('http://www.w3.org/2000/svg') > 0
    ? svg
    : svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));

export const getSVGContent = svg => svg.outerHTML;
