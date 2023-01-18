import React from 'react';

type MoonType = {
  width?: string;
  height?: string;
};

export const MoonIcon: React.FC<MoonType> = ({ height = '16', width = '15' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.35404 8.27997C1.59404 11.7133 4.50738 14.5066 7.99404 14.66C10.454 14.7666 12.654 13.62 13.974 11.8133C14.5207 11.0733 14.2274 10.58 13.314 10.7466C12.8674 10.8266 12.4074 10.86 11.9274 10.84C8.66738 10.7066 6.00071 7.97997 5.98738 4.75997C5.98071 3.89331 6.16071 3.07331 6.48738 2.32664C6.84738 1.49997 6.41404 1.10664 5.58071 1.45997C2.94071 2.57331 1.13404 5.23331 1.35404 8.27997Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
