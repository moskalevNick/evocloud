import React from 'react';

type IconType = {
  width?: string;
  height?: string;
};

export const WidgetActiveIcon: React.FC<IconType> = ({ height = '20', width = '20' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_147_12386)">
      <path
        d="M3 11H21V14C21 15.1046 20.1046 16 19 16H5C3.89543 16 3 15.1046 3 14V11Z"
        fill="#148EF8"
      />
    </g>
    <g opacity="0.6" filter="url(#filter1_d_147_12386)">
      <path d="M3 8C3 6.89543 3.89543 6 5 6H19C20.1046 6 21 6.89543 21 8V11H3V8Z" fill="#148EF8" />
    </g>
    <g filter="url(#filter2_d_147_12386)">
      <path d="M17 4C17 3.44772 17.4477 3 18 3C18.5523 3 19 3.44772 19 4V6H17V4Z" fill="#148EF8" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
      fill="#092740"
    />
    <defs>
      <filter
        id="filter0_d_147_12386"
        x="0"
        y="8"
        width="24"
        height="11"
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
          values="0 0 0 0 0.0784314 0 0 0 0 0.556863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12386" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12386"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_147_12386"
        x="0"
        y="3"
        width="24"
        height="11"
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
          values="0 0 0 0 0.0784314 0 0 0 0 0.556863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12386" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12386"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_d_147_12386"
        x="14"
        y="0"
        width="8"
        height="9"
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
          values="0 0 0 0 0.0784314 0 0 0 0 0.556863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12386" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12386"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
