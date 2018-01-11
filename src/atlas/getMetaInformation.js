const getMeta = (svg) => {
  const viewBox = svg.getAttribute('viewBox');
  const VB = (viewBox || "0 0 32 32").split(' ');
  const width = svg.getAttribute('width') || (+VB[2]);
  const height = svg.getAttribute('height') || (+VB[3]);
  const aspect = width / height;
  return {
    viewBox,
    width,
    height,
    aspect
  }
}

export default getMeta;