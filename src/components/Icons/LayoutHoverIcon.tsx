import React from 'react';

type IconType = {
  width?: string;
  height?: string;
};

export const LayoutHoverIcon: React.FC<IconType> = ({ height = '20', width = '20' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_105_3926)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.6665 3.33337C4.11422 3.33337 3.6665 3.78109 3.6665 4.33337V5.66671C3.6665 6.21899 4.11422 6.66671 4.6665 6.66671H18.4998C19.0521 6.66671 19.4998 6.21899 19.4998 5.66671V4.33337C19.4998 3.78109 19.0521 3.33337 18.4998 3.33337H4.6665ZM10.5 8.33337C9.94772 8.33337 9.5 8.78109 9.5 9.33338V16.5C9.5 17.0523 9.94772 17.5 10.5 17.5H18.5C19.0523 17.5 19.5 17.0523 19.5 16.5V9.33337C19.5 8.78109 19.0523 8.33337 18.5 8.33337H10.5Z"
        fill="#14C1F8"
      />
    </g>
    <g opacity="0.5" filter="url(#filter1_d_105_3926)">
      <rect x="3.6665" y="8.33337" width="4.16667" height="9.16667" rx="1" fill="#14C1F8" />
    </g>
    <defs>
      <filter
        id="filter0_d_105_3926"
        x="0.666504"
        y="0.333374"
        width="21.8335"
        height="20.1667"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0784314 0 0 0 0 0.756863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_3926" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_105_3926"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_105_3926"
        x="0.666504"
        y="5.33337"
        width="10.1665"
        height="15.1667"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0784314 0 0 0 0 0.756863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_3926" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_105_3926"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
