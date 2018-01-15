import React from 'react';

const StarSVG = ({text}) => (
  <svg height="200" width="200" viewBox="0 0 200 200">
    <title>Star!</title>
    <polygon strokeWidth={2} points="100,10 40,198 190,78 10,78 160,198"/>
    <text color="#F00" x={10} y={50}>{text}</text>
  </svg>
);

export const StarSVG2 = ({text}) => (
  <svg height="200" width="200" viewBox="0 0 200 200">
    <style dangerouslySetInnerHTML={{__html:`
      polygon {
        fill: #5F4;
      }
    `}}/>
    <title>Star!</title>
    <polygon strokeWidth={2} points="100,10 40,198 190,78 10,78 160,198"/>
    <polygon strokeWidth={2} points="100,10 40,198 190,78 10,78 160,198"/>
    <polygon strokeWidth={2} points="100,10 40,198 190,78 10,78 160,198"/>
    <text color="#F00" x={10} y={50}>{text}</text>
  </svg>
);


export const HomeSVG = ({text}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation">
    <g fill="url(#SVGID_1_)" fillRule="evenodd">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"></path>
      <path
        d="M11.643 6.357a.506.506 0 0 1 .714 0l4.931 4.931c.393.393.256.712-.29.712H7.002c-.553 0-.68-.323-.29-.712l4.93-4.93z"
        fill="inherit"></path>
      <path
        d="M8 12.003c0-.554.453-1.003.997-1.003h6.006c.55 0 .997.438.997 1.003v4.994c0 .554-.453 1.003-.997 1.003H8.997A.993.993 0 0 1 8 16.997v-4.994zm2.667 3.514V18h2.666v-2.483a1.334 1.334 0 1 0-2.666 0z"
        fill="inherit"></path>
      <text color="#F00" x={10} y={50}>{text}</text>
    </g>
  </svg>
);


export const SvgWithDef1 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113 31" >
    <defs>
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0.3699" y1="15.2458" x2="50.3699" y2="15.2458"
                      gradientTransform="matrix(1 0 0 -1 0 30.7318)">
        <stop offset="0" style={{stopColor:'#231F5C'}}/>
        <stop offset="1" style={{stopColor:'#034EA2'}}/>
      </linearGradient>
    </defs>
    <path
      id="visa_id"
      fill="url(#SVGID_1_)"
      d="M19.4,7.7l-6.6,15.6H8.5L5.3,10.9c-0.1-0.6-0.4-1.1-0.9-1.4c-1.3-0.6-2.6-1.1-4-1.3l0.1-0.4h6.9  c0.9,0,1.7,0.7,1.8,1.6l1.7,9l4.2-10.6L19.4,7.7L19.4,7.7z M36.1,18.2c0-4.1-5.7-4.3-5.7-6.2c0-0.6,0.5-1.2,1.7-1.3  c1.4-0.1,2.8,0.1,4,0.7l0.7-3.3c-1.2-0.5-2.5-0.7-3.8-0.7c-4,0-6.8,2.1-6.8,5.2c0,2.2,2,3.5,3.5,4.3s2.1,1.3,2.1,1.9  c0,1-1.3,1.5-2.4,1.5c-1.4,0-2.9-0.3-4.1-1l-0.7,3.4c1.4,0.6,3,0.8,4.5,0.8C33.3,23.6,36,21.5,36.1,18.2 M46.6,23.3h3.8L47.1,7.7  h-3.5c-0.8,0-1.4,0.5-1.7,1.2l-6.1,14.5h4.2L41,21h5.2L46.6,23.3z M42.1,17.8l2.1-5.9l1.2,5.9H42.1L42.1,17.8z M25.1,7.7l-3.3,15.6  h-4l3.3-15.6L25.1,7.7L25.1,7.7z"/>
    <circle fill="#ED1C24" cx="77" cy="15.5" r="15.3"/>
  </svg>
);

export const SvgWithDef2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113 31">
    <defs>
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0.3699" y1="15.2458" x2="50.3699" y2="15.2458"
                      gradientTransform="matrix(1 0 0 -1 0 30.7318)">
        <stop offset="0" style={{stopColor:'#000'}}/>
        <stop offset="1" style={{stopColor:'#F00'}}/>
      </linearGradient>
    </defs>
    <path fill="url(#SVGID_1_)"
          stroke="#000"
          d="M19.4,7.7l-6.6,15.6H8.5L5.3,10.9c-0.1-0.6-0.4-1.1-0.9-1.4c-1.3-0.6-2.6-1.1-4-1.3l0.1-0.4h6.9  c0.9,0,1.7,0.7,1.8,1.6l1.7,9l4.2-10.6L19.4,7.7L19.4,7.7z M36.1,18.2c0-4.1-5.7-4.3-5.7-6.2c0-0.6,0.5-1.2,1.7-1.3  c1.4-0.1,2.8,0.1,4,0.7l0.7-3.3c-1.2-0.5-2.5-0.7-3.8-0.7c-4,0-6.8,2.1-6.8,5.2c0,2.2,2,3.5,3.5,4.3s2.1,1.3,2.1,1.9  c0,1-1.3,1.5-2.4,1.5c-1.4,0-2.9-0.3-4.1-1l-0.7,3.4c1.4,0.6,3,0.8,4.5,0.8C33.3,23.6,36,21.5,36.1,18.2 M46.6,23.3h3.8L47.1,7.7  h-3.5c-0.8,0-1.4,0.5-1.7,1.2l-6.1,14.5h4.2L41,21h5.2L46.6,23.3z M42.1,17.8l2.1-5.9l1.2,5.9H42.1L42.1,17.8z M25.1,7.7l-3.3,15.6  h-4l3.3-15.6L25.1,7.7L25.1,7.7z"/>
    <circle fill="#ED1C24" cx="77" cy="15.5" r="15.3"/>
  </svg>
);

export default StarSVG;