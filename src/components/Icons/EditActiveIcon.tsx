import React from 'react';

type EditActiveIconType = {
  width?: string;
  height?: string;
};

export const EditActiveIcon: React.FC<EditActiveIconType> = ({ height = '22', width = '22' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_147_12394)">
      <path
        d="M18.2429 6.07384C18.7048 6.53576 18.7124 7.28233 18.2599 7.75352L11.6953 14.5898C11.4751 14.8192 11.1728 14.9517 10.8549 14.9584L8.09349 15.0163L8.15168 12.2427C8.1582 11.9321 8.28497 11.636 8.50533 11.4169L15.2187 4.7419C15.6878 4.27556 16.4457 4.27665 16.9134 4.74433L18.2429 6.07384Z"
        fill="#148EF8"
      />
    </g>
    <g opacity="0.5" filter="url(#filter1_d_147_12394)">
      <path
        d="M11.6755 3.87793C12.0897 3.87793 12.4255 4.21372 12.4255 4.62793C12.4255 5.04214 12.0897 5.37793 11.6755 5.37793H6.50049C5.67206 5.37793 5.00049 6.0495 5.00049 6.87793V15.8779C5.00049 16.7064 5.67206 17.3779 6.50049 17.3779H15.5005C16.3289 17.3779 17.0005 16.7064 17.0005 15.8779V12.1279C17.0005 11.7137 17.3363 11.3779 17.7505 11.3779C18.1647 11.3779 18.5005 11.7137 18.5005 12.1279V15.8779C18.5005 17.5348 17.1573 18.8779 15.5005 18.8779H6.50049C4.84363 18.8779 3.50049 17.5348 3.50049 15.8779V6.87793C3.50049 5.22108 4.84363 3.87793 6.50049 3.87793H11.6755Z"
        fill="#148EF8"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_147_12394"
        x="5.09326"
        y="1.39258"
        width="16.501"
        height="16.624"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12394" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12394"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_147_12394"
        x="0.500488"
        y="0.87793"
        width="21"
        height="21"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12394" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12394"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
